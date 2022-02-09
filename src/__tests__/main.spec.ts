import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, rmSync } from 'fs';
import path from 'path';
import yarnThisDir from '../index';

const pwd = __dirname;
const fixturesDirPath = path.join(pwd, 'fixtures');

describe('When yarnThisDir is called in a project directory', () => {
  beforeEach(() => {
    if (!existsSync(fixturesDirPath)) {
      mkdirSync(fixturesDirPath);
    }
  });

  test('that is valid - with package.json', () => {
    // using fixturesDirPath as context, run the following
    execSync('npm init --yes', {
      cwd: fixturesDirPath,
    }); // initialize a node project
    execSync('npm install has-yarn', {
      cwd: fixturesDirPath,
    }); // install a light package to auto gen package-lock.json

    yarnThisDir(fixturesDirPath);
    const fixturesDir = readdirSync(fixturesDirPath, {
      encoding: 'utf-8',
    });

    expect(fixturesDir).not.toContain('package-lock.json');
  });

  describe('that is not valid', () => {
    test('without package.json', () => {
      const mockExit = jest
        .spyOn(process, 'exit')
        .mockImplementation((number) => {
          throw new Error('process.exit: ' + number);
        });

      expect(() => {
        yarnThisDir(fixturesDirPath);
      }).toThrowError();
      expect(mockExit).toHaveBeenCalledWith(1);
      mockExit.mockRestore();
    });

    test('without package-lock.json', () => {
      const mockExit = jest
        .spyOn(process, 'exit')
        .mockImplementation((number) => {
          throw new Error('process.exit: ' + number);
        });

      expect(() => {
        yarnThisDir(fixturesDirPath);
      }).toThrowError();
      expect(mockExit).toHaveBeenCalledWith(1);
      mockExit.mockRestore();
    });
  });
});

afterAll(() => {
  rmSync(fixturesDirPath, {
    force: true,
    recursive: true,
  });
});
