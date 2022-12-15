import * as path from 'node:path';
import * as fs from 'node:fs/promises';

import { appEnv } from './app-enviroment.mjs';
import * as errHandler from './app-errors-handler.mjs';
import { getAbsolutePath } from './path-parser.mjs';

export const goToUpperDirectory = (args) => {
  // Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)

  if (errHandler.isCommandWithoutArgs(args)) {
    const newCurrentPath = appEnv.currentPath.split(path.sep);

    if (newCurrentPath.length > 1) {
      appEnv.currentPath = newCurrentPath.slice(0, -1).join(path.sep);
    }
  }
};

export const goToDedicatedDirectory = async (args) => {
  // Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
  if (errHandler.hasOneArgument(args)) {
    const enteredPath = path.normalize(args[0]);
    const newPath = await getAbsolutePath(enteredPath);
    if (newPath) {
      appEnv.currentPath = newPath;
    }
  }
};

export const showFolderContent = async (args) => {
  // Print in console list of all files and folders in current directory. List should contain
  // - list should contain files and folder names (for files - with extension)
  // - folders and files are sorted in alphabetical order ascending, but list of folders goes first
  // - type of directory content should be marked explicitly (e.g. as a corresponding column value)
  const folderContent = await fs.readdir(appEnv.currentPath, {
    withFileTypes: true,
  });
  const files = folderContent
    .filter((el) => el.isFile())
    .sort((a, b) => a.name - b.name)
    .map((dirent) => {
      return {
        Name: dirent.name,
        Type: 'file',
      };
    });

  const folders = folderContent
    .filter((el) => !el.isFile())
    .sort((a, b) => a.name - b.name)
    .map((dirent) => {
      return {
        Name: dirent.name,
        Type: 'directory',
      };
    });

  console.table([...folders, ...files]);
};
