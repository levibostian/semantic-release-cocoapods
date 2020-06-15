const execa = require('execa');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (context) => {
  const {cwd, env, logger} = context;

  logger.log(`Checking if token environment variable set`);
  if (!env.COCOAPODS_TRUNK_TOKEN) {
    throw new AggregateError([getError('ENOPODTOKEN', {})]);
  }

  try {
    logger.log(`Checking if authenticated with cocoapods with valid account and session.`);
    await execa('pod', ['trunk', 'me', '--silent'], {cwd, env});
  } catch (_) {
    throw new AggregateError([getError('EINVALIDPODTOKEN', {})]);
  }
};
