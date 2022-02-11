# [yarnthisdir](https://www.npmjs.com/package/yarnthisdir) &middot; [![main](https://github.com/Olowotemple/yarnthisdir/actions/workflows/main.yml/badge.svg)](https://github.com/Olowotemple/yarnthisdir/actions/workflows/main.yml) [![Publish Package to npmjs](https://github.com/Olowotemple/yarnthisdir/actions/workflows/publish.yml/badge.svg)](https://github.com/Olowotemple/yarnthisdir/actions/workflows/publish.yml) [![GitHub issues](https://img.shields.io/github/issues/Olowotemple/yarnthisdir)](https://github.com/Olowotemple/yarnthisdir/issues) ![license badge](https://img.shields.io/badge/license-MIT-blue)

> Transform a project using [npm](https://docs.npmjs.com) to [Yarn](https://yarnpkg.com)

You started a new project with npm but decided at some point to switch over to yarn?

This tool makes converting over easy

## Install

```terminal
npm install yarnthisdir
```

## Usage

```javascript
import yarnThisDir from 'yarnthisdir';

/* 
  you typically only need to do this once,
  call yarnThisDir from root which contains
  `package.json` and `package-lock.json`
*/
yarnThisDir();
```

## API

### yarnThisDir(wd?)

Transforms a project that uses npm to Yarn.

- ### parameters

  - wd
    - Type: `String`
    - Default: `process.cwd()`
    - Description: The current working directory

> Pull Requests are highly welcome.
