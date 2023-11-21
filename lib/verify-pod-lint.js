import execa from 'execa';
import AggregateError from 'aggregate-error';
import getError from './get-error.js';

export default async function(pluginConfig, context) {
  const {cwd, env, stdout, stderr, logger} = context;

  if (!pluginConfig.podLint) {
    logger.log(`pod lib lint being skipped. Disabled through plugin configuration`);
    return;
  }

  try {
    logger.log(`Running 'pod lib lint' to verify lib ready for publishing.`);

    const result = execa('pod', ['lib', 'lint', pluginConfig.podLintArgs], {cwd, env});
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;
  } catch (_) {
    throw new AggregateError([getError('ECLINOTINSTALLED', {})]);
  }
};
