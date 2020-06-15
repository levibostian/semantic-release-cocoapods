const execa = require('execa');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {cwd, env, stdout, stderr, logger} = context;
  try {
    logger.log(`Verifying 'pod' installed on machine`);
    const result = execa('command', ['-v', 'pod'], {cwd, env});
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;
  } catch (_) {
    throw new AggregateError([getError('ECLINOTINSTALLED', {})]);
  }
};
