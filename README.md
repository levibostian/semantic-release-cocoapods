[![Travis](https://travis-ci.com/levibostian/semantic-release-cocoapods.svg?branch=master)](https://travis-ci.org/levibostian/semantic-release-cocoapods)
[![npm latest version](https://img.shields.io/npm/v/semantic-release-cocoapods/latest.svg)](https://www.npmjs.com/package/semantic-release-cocoapods)

# semantic-release-cocoapods

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a [cocoapods](https://cocoapods.org/) package.

| Step               | Description                                                                                                                                                               |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify `pod` command exists, `COCOAPODS_TRUNK_TOKEN` environment variable is set, `pod trunk me` is successful. Run `pod lib lint` to verify the pod is ready to publish. |
| `prepare`          | Update the `podspec` version.                                                                                                                                             |
| `publish`          | Publish the cocoapods pod to the registry.                                                                                                                                |

## Install

```bash
$ npm install semantic-release-cocoapods -D
```

## Usage

First, make sure that [cocoapods is installed on your machine](https://guides.cocoapods.org/using/getting-started.html#installation).

The plugin is recommended be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration). This is because this plugin must exist *after* [@semantic-release/github](https://github.com/semantic-release/github). Cocoapods requires a GitHub tag exists to make a release.

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "semantic-release-cocoapods"
  ]
}
```

## Configuration

### Cocoapods authentication

The npm authentication configuration is **required** and can be set via [environment variables](#environment-variables).

### Environment variables

To use this plugin and ultimately publish a cocoapods package, you must set these environment variables. 

| Variable                | Description                                                                                                      |
|-------------------------|------------------------------------------------------------------------------------------------------------------|
| `COCOAPODS_TRUNK_TOKEN` | [Created token](https://fuller.li/posts/automated-cocoapods-releases-with-ci/) to push pod to cocoapods.org.     |

### Options

| Options       | Description                                 |  Default  |
|---------------|---------------------------------------------|-----------|
| `podLint`     | Whether to lint the pod or not.             | `true`    |
| `podLintArgs` | Extra arguments to pass to `pod lib lint`   |           |
| `podPushArgs` | Extra arguments to pass to `pod trunk push` |           |

##### Examples

Here is an example on how to set options 

```json
{
  "plugins": [
    "@semantic-release/github",
    ["semantic-release-cocoapods", {
      "podLint": false,
      "podLintArgs": "--allow-warnings",
    }]
  ]
}
```

