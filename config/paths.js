'use strict';

const path = require('path');

const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);

module.exports = {
  publicUrl: '/',
  appBuild: resolveApp('dist'),
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('dist'),
  appSrc: resolveApp('src'),
};
