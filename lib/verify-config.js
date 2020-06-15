const {isString, isNil, isBoolean} = require('lodash');
const getError = require('./get-error');

const VALIDATORS = {
  podLint: isBoolean,
  podLintArgs: isString,
  podPushArgs: isString,
};

module.exports = ({podLint, podLintArgs, podPushArgs}) => {
  const errors = Object.entries({podLint, podLintArgs, podPushArgs}).reduce(
    (errors, [option, value]) =>
      !isNil(value) && !VALIDATORS[option](value)
        ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
        : errors,
    []
  );

  return errors;
};
