import replaceInFile from 'replace-in-file';

export default async function(pluginConfig, context) {
  const {
    cwd,
    nextRelease: {version},
    logger,
  } = context;

  logger.log(`Write version ${version} to ${cwd}/*.podspec`);

  // https://regexr.com/56ik3
  const replaceInFileOptions = {
    files: `${cwd}/*.podspec`,
    from: /\.version\s*=.*/g,
    to: (match) => {
      // We want to preserve whitespace. So, we are only going to replace the `= 'X.X.X'` part of the string.
      // regexr.com/56oig
      return match.replace(/=.*/g, `= '${version}'`);
    },
  };

  await replaceInFile(replaceInFileOptions);
};
