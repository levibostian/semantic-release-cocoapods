module.exports = {
  EINVALIDPODLINT: ({podLint}) => ({
    message: 'Invalid `podLint` option.',
    details: `The podLint option, if defined, must be a \`Boolean\`.

Your configuration for the \`podLint\` option is \`${podLint}\`.`,
  }),
  EINVALIDPODLINTARGS: ({podLintArgs}) => ({
    message: 'Invalid `podLintArgs` option.',
    details: `The podLintArgs option, if defined, must be a \`String\`.

Your configuration for the \`podLintArgs\` option is \`${podLintArgs}\`.`,
  }),
  EINVALIDPODPUSHARGS: ({podPushArgs}) => ({
    message: 'Invalid `podPushArgs` option.',
    details: `The podPushArgs option, if defined, must be a \`String\`.

Your configuration for the \`podPushArgs\` option is \`${podPushArgs}\`.`,
  }),
  ECLINOTINSTALLED: () => ({
    message: "You do not have 'pod' installed on your machine.",
    details: `You must have 'pod' installed to work with cocoapods. [Install the 'pod' CLI](https://cocoapods.org/) then try again.`,
  }),
  ENOPODTOKEN: () => ({
    message: 'No cocoapods trunk token specified.',
    details: `An cocoapods token must be created and set in the \`COCOAPODS_TRUNK_TOKEN\` environment variable on your CI environment for the cocoapods account you want to push the pod update for.`,
  }),
  EINVALIDPODTOKEN: () => ({
    message: 'Invalid cocoapods trunk token.',
    details: `The cocoapods token configured in the \`COCOAPODS_TRUNK_TOKEN\` environment variable must be a valid. This token is not associated with a valid user and/or session.`,
  }),
};
