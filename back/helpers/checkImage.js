import { access, constants } from 'node:fs/promises';

export const checkImage = async (path) => {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch (error) {
    console.log(error);
  }
}