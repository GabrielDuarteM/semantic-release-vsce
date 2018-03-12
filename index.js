const SemanticReleaseError = require('@semantic-release/error');
const verifyVsce = require('./lib/verify');
const vscePublish = require('./lib/publish');
const prepareVsce = require('./lib/prepare');

let verified;
let prepared;

async function verifyConditions (pluginConfig, {logger}) {
  try {
    await verifyVsce(logger);
  } catch (err) {
    throw new SemanticReleaseError('There was an error verifying the release.', 'EVERVSCE');
  }
  verified = true;
}

async function publish (pluginConfig, {nextRelease: {version}, logger}) {
  try {
    if (!verified) {
      await verifyVsce(logger);
      verified = true;
    }

    if (!prepared) {
      await prepareVsce(pluginConfig, version, logger);
    }

    await vscePublish(version, pluginConfig.packageVsix, logger);
  } catch (err) {
    throw new SemanticReleaseError('There was an error publishing the release.', 'EPUBVSCE');
  }
}

async function prepare (pluginConfig, { nextRelease: { version }, logger }) {
  try {
    await prepareVsce(pluginConfig, version, logger);
    prepared = true;
  } catch (err) {
    throw new SemanticReleaseError('There was an error preparing the release.', 'EPREPVSCE');
  }
}

module.exports = {
  verifyConditions,
  prepare,
  publish
};
