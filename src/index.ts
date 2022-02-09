import chalk from 'chalk';
import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import path from 'path';
import { cwd, exit } from 'process';
import { failureLog, initLog, log, successLog } from './utils/helpers';

export default function (wd?: string) {
  initLog('yarnthisdir');

  const pwd = wd || cwd();

  const packageJsonFilePath = path.join(pwd, 'package.json');
  if (existsSync(packageJsonFilePath)) {
    successLog('package.json found!');
  } else {
    failureLog(
      'Cannot find package.json within this directory: not a valid node project.'
    );
    log(`Operation failed, exiting with ${chalk.red('code 1')} ...`);
    exit(1);
  }

  const autoGenLockFileName = 'package-lock.json';
  const npmLockFilePath = path.join(pwd, autoGenLockFileName);

  if (existsSync(npmLockFilePath)) {
    log(`Removing ${autoGenLockFileName}...`);

    rmSync(npmLockFilePath);

    successLog(`${autoGenLockFileName} has been successfully removed`);
  } else {
    // package-lock.json doesn't exist
    failureLog(`Failed to find ${autoGenLockFileName}`);
    log(`Operation failed, exiting with ${chalk.red('code 1')} ...`);
    exit(1);
  }

  const nodeModFileName = 'node_modules';
  const nodeModulesDirPath = path.join(pwd, nodeModFileName);
  if (existsSync(nodeModulesDirPath)) {
    log(`Removing ${nodeModFileName}...`);

    rmSync(nodeModulesDirPath, {
      force: true,
      recursive: true,
    });

    successLog(`${nodeModFileName} has been successfully removed`);
  }

  // check if yarn is installed on the user's device
  // or locally in the project dir
  const packageJsonFile = readFileSync(packageJsonFilePath, {
    encoding: 'utf-8',
  });

  const parsedPackageJsonFile = JSON.parse(packageJsonFile);

  const isYarnGloballyInstalled = !!execSync('yarn --version', {
    encoding: 'utf8',
  });

  const isYarnLocallyInstalled =
    (parsedPackageJsonFile.dependencies &&
      'yarn' in parsedPackageJsonFile.dependencies) ||
    (parsedPackageJsonFile.devDependencies &&
      'yarn' in parsedPackageJsonFile.devDependencies);

  if (!isYarnGloballyInstalled && !isYarnLocallyInstalled) {
    failureLog(`Cannot detect '${chalk.italic('yarn')}' on this system`);
    log(`Operation failed, exiting with ${chalk.red('code 1')} ...`);
    log(
      "Run 'npm install --global yarn' or visit https://classic.yarnpkg.com/en/docs/install to learn more on how to install yarn"
    );
    exit(1);
  }

  log('Installing dependencies with yarn');
  spawnSync('yarn', {
    stdio: 'inherit',
    shell: true,
    cwd: pwd,
  });

  successLog('Success!', true, false);
  log('Your project has been converted over to use yarn instead of npm', false);
  log('You might need to take the following steps where neccessary:');
  log(`1. Update your scripts in package.json to now use yarn `, true, false);
  log(
    `${chalk.yellow(JSON.stringify(parsedPackageJsonFile.scripts, null, 2))}`,
    false,
    false
  );
  log('2. Update your CI/CD workflow configuration');
}
