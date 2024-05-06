import fs from 'fs';
import axios from 'axios';

const download = async (url: string, filepath: string) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
};

export default download;
