const {readJson, writeJson, pathExists} = require('fs-extra');
const { join } = require('path');

module.exports = async (version, basePath, logger) => {
  const packagePath = join(basePath, 'package.json');
  const shrinkwrapPath = join(basePath, 'npm-shrinkwrap.json');
  const packageLockPath = join(basePath, 'package-lock.json');
  const pkg = await readJson(packagePath);

  await writeJson(packagePath, {...pkg, ...{version}}, {spaces: 2});
  logger.log('Wrote version %s to %s', version, packagePath);

  if (await pathExists(shrinkwrapPath)) {
    const shrinkwrap = await readJson(shrinkwrapPath);
    await writeJson(shrinkwrapPath, {...shrinkwrap, ...{version}}, {spaces: 2});
    logger.log('Wrote version %s to %s', version, shrinkwrapPath);
  }

  if (await pathExists(packageLockPath)) {
    const packageLock = await readJson(packageLockPath);
    await writeJson(packageLockPath, {...packageLock, ...{version}}, {spaces: 2});
    logger.log('Wrote version %s to %s', version, packageLockPath);
  }
};
