const updatePackageVersion = require('./update-package-version');

module.exports = async ({ pkgRoot }, version, logger) => {
  const basePath = pkgRoot || '.';
  await updatePackageVersion(version, basePath, logger);
};
