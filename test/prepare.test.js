const path = require('path');
const test = require('ava');
const {outputFile, readFile} = require('fs-extra');
const tempy = require('tempy');
const {stub} = require('sinon');
const {WritableStreamBuffer} = require('stream-buffers');
const prepare = require('../lib/prepare');

test.beforeEach((t) => {
  t.context.log = stub();
  t.context.logger = {log: t.context.log};
  t.context.stdout = new WritableStreamBuffer();
  t.context.stderr = new WritableStreamBuffer();
});

test('Update podspec', async (t) => {
  const cwd = tempy.directory();
  const packagePath = path.resolve(cwd, 'Test.podspec');
  await outputFile(packagePath, "s.version = '0.0.1'");

  await prepare(
    {},
    {
      cwd,
      env: {},
      stdout: t.context.stdout,
      stderr: t.context.stderr,
      nextRelease: {version: '1.0.0'},
      logger: t.context.logger,
    }
  );

  // Verify package.json has been updated
  t.is(await readFile(packagePath, 'utf-8'), `s.version = '1.0.0'`);

  // Verify the logger has been called with the version updated
  t.deepEqual(t.context.log.args[0], [`Write version 1.0.0 to ${cwd}/*.podspec`]);
});

test('Preserve indentation and newline', async (t) => {
  const cwd = tempy.directory();
  const packagePath = path.resolve(cwd, 'Test.podspec');
  await outputFile(
    packagePath,
    `Pod::Spec.new do |s|\n  s.name             = 'Teller'\n  s.version             = '0.0.1'\n\n`
  );

  await prepare(
    {},
    {
      cwd,
      env: {},
      stdout: t.context.stdout,
      stderr: t.context.stderr,
      nextRelease: {version: '1.0.0'},
      logger: t.context.logger,
    }
  );

  // Verify podspec has been updated
  t.is(
    await readFile(packagePath, 'utf-8'),
    `Pod::Spec.new do |s|\n  s.name             = 'Teller'\n  s.version             = '1.0.0'\n\n`
  );
});
