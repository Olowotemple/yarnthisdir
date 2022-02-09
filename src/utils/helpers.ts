import chalk from 'chalk';
/* eslint-disable no-console */

export const successLog = (
  message: unknown,
  includeSpaceBefore = true,
  includeSpaceAfter = true
) => {
  console.log(
    chalk.green.italic(
      `${includeSpaceBefore ? '\n' : ''}${message}${
        includeSpaceAfter ? '\n' : ''
      }`
    )
  );
};

export const failureLog = (
  message: unknown,
  includeSpaceBefore = true,
  includeSpaceAfter = true
) => {
  console.log(
    chalk.red.italic(
      `${includeSpaceBefore ? '\n' : ''}${message}${
        includeSpaceAfter ? '\n' : ''
      }`
    )
  );
};

export const log = (
  message: unknown,
  includeSpaceBefore = true,
  includeSpaceAfter = true
) => {
  console.log(
    chalk.whiteBright(
      `${includeSpaceBefore ? '\n' : ''}${message}${
        includeSpaceAfter ? '\n' : ''
      }`
    )
  );
};

export const initLog = (packageName: string) => {
  console.log(chalk.greenBright.bold(`\n>>>${packageName}>>>\n`));
};
