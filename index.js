const {defaultTo} = require('lodash');
const AggregateError = require('aggregate-error');
const verifyPluginConfig = require('./lib/verify-config');
const verifyPodAuth = require('./lib/verify-auth');
const verifyCliInstalled = require('./lib/verify-cli-installed');
const verifyPodLint = require('./lib/verify-pod-lint');
const preparePod = require('./lib/prepare');
const publishPod = require('./lib/publish');

// Let verified;
let prepared;

async function verifyConditions(pluginConfig, context) {
  // Set default values for config
  pluginConfig.podLint = defaultTo(pluginConfig.podLint, true);
  pluginConfig.podLintArgs = defaultTo(pluginConfig.podLintArgs, '');
  pluginConfig.podPushArgs = defaultTo(pluginConfig.podPushArgs, '');

  const errors = verifyPluginConfig(pluginConfig);

  try {
    // 1. Verify `pod` command exists
    await verifyCliInstalled(pluginConfig, context);

    // 2. Verify `COCOAPODS_TRUNK_TOKEN` environment variable exists
    // 3. Verify `pod trunk me` is successful.
    await verifyPodAuth(pluginConfig, context);

    // 4. Verify `pod lib lint` is successful
    await verifyPodLint(pluginConfig, context);
  } catch (error) {
    errors.push(...error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  //  Verified = true;
}

async function prepare(pluginConfig, context) {
  await preparePod(pluginConfig, context);
  prepared = true;
}

async function publish(pluginConfig, context) {
  if (!prepared) {
    await preparePod(pluginConfig, context);
  }

  return publishPod(pluginConfig, context);
}

module.exports = {verifyConditions, prepare, publish};
