
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

const downloadFile = async (name, fileUrl, downloadFolder) => {
  // Get the file name
  let type = fileUrl.split('.').pop();

  const fileName = path.basename(name + '.' + type); // до 01.02.2023 было так 
  // const fileName = path.basename(name + '.' + 'jpg');

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default downloadFile;