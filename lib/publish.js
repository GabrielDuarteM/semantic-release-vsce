const execa = require('execa');

module.exports = async (version, packageVsix, logger) => {
  const { VSCE_TOKEN } = process.env;

  logger.log('Publishing version %s to vs code marketplace', version);
  await execa('vsce', ['publish', '--pat', VSCE_TOKEN], {stdio: 'inherit'});

  if (packageVsix) {
    logger.log('Packaging version %s as .vsix', version);
    await execa('vsce', ['package', '--out', packageVsix], { stdio: 'inherit' });
  }
};
