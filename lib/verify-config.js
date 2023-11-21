import {isString, isNil, isBoolean} from 'lodash-es';
import getError from './get-error.js';

const VALIDATORS = {
  podLint: isBoolean,
  podLintArgs: isString,
  podPushArgs: isString,
};

export default async function({podLint, podLintArgs, podPushArgs}) {
  const errors = Object.entries({podLint, podLintArgs, podPushArgs}).reduce(
    (errors, [option, value]) =>
      !isNil(value) && !VALIDATORS[option](value)
        ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
        : errors,
    []
  );

  return errors;
};
