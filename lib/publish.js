const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {version},
    logger,
  } = context;

  logger.log(`Publishing version ${version} to cocoapods`);

  const result = execa('pod', ['trunk', 'push', pluginConfig.podPushArgs], {cwd, env});
  result.stdout.pipe(stdout, {end: false});
  result.stderr.pipe(stderr, {end: false});
  await result;

  logger.log(`Published ${version} to cocoapods!`);

  return {version};
};
