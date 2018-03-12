const verifyVsce = require('./lib/verify');
const vscePublish = require('./lib/publish');
const prepareVsce = require('./lib/prepare');

let verified;
let prepared;

async function verifyConditions (pluginConfig, {logger}) {
  await verifyVsce(logger);
  verified = true;
}

async function publish (pluginConfig, {nextRelease: {version}, logger}) {
  if (!verified) {
    await verifyVsce(logger);
    verified = true;
  }

  if (!prepared) {
    await prepareVsce(pluginConfig, version, logger);
  }

  await vscePublish(version, pluginConfig.packageVsix, logger);
}

async function prepare (pluginConfig, { nextRelease: { version }, logger }) {
  await prepareVsce(pluginConfig, version, logger);
  prepared = true;
}

module.exports = {
  verifyConditions,
  prepare,
  publish
};
