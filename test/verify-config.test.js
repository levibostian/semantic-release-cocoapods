const test = require('ava');
const {stub} = require('sinon');
const verify = require('../lib/verify-config');

test.beforeEach((t) => {
  // Stub the logger functions
  t.context.log = stub();
  t.context.logger = {log: t.context.log};
});

test('Verify "podLint", "podLintArgs" and "podPushArgs" options', async (t) => {
  t.deepEqual(
    await verify(
      {podLint: false, podLintArgs: '--allow-warnings', podPushArgs: '--allow-warnings'},
      {},
      t.context.logger
    ),
    []
  );
});

test('Verify "podLint", "podLintArgs" and "podPushArgs" default values', async (t) => {
  t.deepEqual(await verify({podLint: true, podLintArgs: '', podPushArgs: ''}, {}, t.context.logger), []);
});

test('Return SemanticReleaseError if "podLint" option is not a Boolean', async (t) => {
  const podLint = 42;
  const [error, ...errors] = await verify({podLint}, {}, t.context.logger);

  t.is(errors.length, 0);
  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'EINVALIDPODLINT');
});

test('Return SemanticReleaseError if "podLintArgs" option is not a String', async (t) => {
  const podLintArgs = 42;
  const [error, ...errors] = await verify({podLintArgs}, {}, t.context.logger);

  t.is(errors.length, 0);
  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'EINVALIDPODLINTARGS');
});

test('Return SemanticReleaseError if "podPushArgs" option is not a String', async (t) => {
  const podPushArgs = 42;
  const [error, ...errors] = await verify({podPushArgs}, {}, t.context.logger);

  t.is(errors.length, 0);
  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'EINVALIDPODPUSHARGS');
});

test('Return SemanticReleaseError Array if multiple config are invalid', async (t) => {
  const podLint = 42;
  const podLintArgs = 42;
  const podPushArgs = 42;
  const [error1, error2, error3] = await verify({podLint, podLintArgs, podPushArgs}, {}, t.context.logger);

  t.is(error1.name, 'SemanticReleaseError');
  t.is(error1.code, 'EINVALIDPODLINT');

  t.is(error2.name, 'SemanticReleaseError');
  t.is(error2.code, 'EINVALIDPODLINTARGS');

  t.is(error3.name, 'SemanticReleaseError');
  t.is(error3.code, 'EINVALIDPODPUSHARGS');
});
