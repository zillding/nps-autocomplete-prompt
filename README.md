# nps-autocomplete-prompt

![](https://img.shields.io/travis/zillding/nps-autocomplete-prompt/master.svg?style=flat-square)
![](https://img.shields.io/npm/v/nps-autocomplete-prompt.svg?style=flat-square)
![](https://img.shields.io/github/license/zillding/nps-autocomplete-prompt.svg?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


Autocomplete prompt for [nps](https://github.com/kentcdodds/nps)

<img width="600" src="https://cdn.jsdelivr.net/gh/zillding/nps-autocomplete-prompt/demo.svg">

## Install

Install with `npm`:

```
npm install --save-dev nps-autocomplete-prompt
# or globally
npm install --global nps-autocomplete-prompt
```

Install with `yarn`:

```
yarn add --dev nps-autocomplete-prompt
# or globally
yarn global add nps-autocomplete-prompt
```

## Usage

From project which has nps installed and contains package scripts file
(`package-scripts.js` or `package-scripts.yml`):

`nap`

Any additonal cli parameters will be passed to nps and executed directly.

`nap lint` is equivalent to `nps lint`

## Similar package

- [nps-i](https://www.npmjs.com/package/nps-i)
