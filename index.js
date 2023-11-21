import {defaultTo} from 'lodash-es';
import AggregateError from 'aggregate-error';
import verifyPluginConfig from './lib/verify-config.js';
import verifyPodAuth from './lib/verify-auth.js';
import verifyCliInstalled from './lib/verify-cli-installed.js';
import verifyPodLint from './lib/verify-pod-lint.js';
import preparePod from './lib/prepare.js';
import publishPod from './lib/publish.js';

// Let verified;
let prepared;

export async function verifyConditions(pluginConfig, context) {
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

export async function prepare(pluginConfig, context) {
  await preparePod(pluginConfig, context);
  prepared = true;
}

export async function publish(pluginConfig, context) {
  if (!prepared) {
    await preparePod(pluginConfig, context);
  }

  return publishPod(pluginConfig, context);
}
