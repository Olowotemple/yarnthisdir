# [yarnthisdir](https://www.npmjs.com/package/yarnthisdir) &middot; [![CI](https://github.com/Olowotemple/yarnthisdir/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Olowotemple/yarnthisdir/actions/workflows/pipeline.yml) [![GitHub issues](https://img.shields.io/github/issues/Olowotemple/yarnthisdir)](https://github.com/Olowotemple/yarnthisdir/issues) ![license badge](https://img.shields.io/badge/license-MIT-blue)

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

#### wd

Type: `string`\
Default: `process.cwd()`

The current working directory.
