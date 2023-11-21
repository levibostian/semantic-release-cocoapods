import execa from 'execa';
import AggregateError from 'aggregate-error';
import getError from './get-error.js';

export default async function(pluginConfig, context) {
  const {cwd, env, stdout, stderr, logger} = context;

  logger.log(`Checking if token environment variable set`);
  if (!env.COCOAPODS_TRUNK_TOKEN) {
    throw new AggregateError([getError('ENOPODTOKEN', {})]);
  }

  try {
    logger.log(`Checking if authenticated with cocoapods with valid account and session.`);

    const result = execa('pod', ['trunk', 'me', '--silent'], {cwd, env});
    result.stdout.pipe(stdout, {end: false});
    result.stderr.pipe(stderr, {end: false});
    await result;
  } catch (_) {
    throw new AggregateError([getError('EINVALIDPODTOKEN', {})]);
  }
};
