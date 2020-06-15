const execa = require('execa');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (context) => {
  const {cwd, env, logger} = context;
  try {
    logger.log(`Verifying 'pod' installed on machine`);
    await execa('command', ['-v', 'pod'], {cwd, env});
  } catch (_) {
    throw new AggregateError([getError('ECLINOTINSTALLED', {})]);
  }
};
