import rnfs from 'react-native-fs';

export const uriToFilename = (fullUri: string) => {
  const fileName = fullUri.split('/').pop() as string;
  console.log('Filename is ', fileName);
  return fileName;
};

export const saveImageToFileSystem = (tempUri: string) => {
  const fileName = uriToFilename(tempUri);
  const newPath = `${rnfs.DocumentDirectoryPath}/${fileName}`;

  let wasSuccess = false;

  // COPY the file
  rnfs
    .copyFile(tempUri, newPath)
    .then((success) => {
      console.log('IMG COPIED!');
      wasSuccess = true;
    })
    .catch((err) => {
      console.warn(err.message);
    });

  return {
    fileName: fileName,
    success: wasSuccess,
  };
};

export const saveImagesToFileSystem = (tempUris: string[]) => {
  const results = tempUris.map((uri) => saveImageToFileSystem(uri));
  return results;
};

export const retreivePathForEntry = (filename: string) => {
  const path = `file://${rnfs.DocumentDirectoryPath}/${filename}`;
  return path;
};

export const retreivePathsForEntries = (filenames?: string[]) => {
  const paths = filenames?.map((filename) => retreivePathForEntry(filename));
  return paths;
};
