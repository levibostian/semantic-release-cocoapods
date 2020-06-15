const execa = require('execa');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {cwd, env, logger} = context;

  if (!pluginConfig.podLint) {
    logger.log(`pod lib lint being skipped. Disabled through plugin configuration`);
    return;
  }

  try {
    logger.log(`Running 'pod lib lint' to verify lib ready for publishing.`);

    await execa('pod', ['lib', 'lint', pluginConfig.podLintArgs], {cwd, env});
  } catch (_) {
    throw new AggregateError([getError('ECLINOTINSTALLED', {})]);
  }
};
