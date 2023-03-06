import axios from 'axios';

import Area from '../models/area.js';
import downloadFile from '../helpers/downloadFile.js';
import { checkImage } from '../helpers/checkImage.js';

const urlPathInfo = `https://api.telegram.org/bot5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/getFile?file_id=`;
const urlPathGetImage = `https://api.telegram.org/file/bot5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/`;
const path = '/Users/umbet/OneDrive/Desktop/smtp-tg-bot/back/public/images/';
// const path = '/home/ubuntu/smtp-tg-bot/back/public/images/';
class GetImageService {
  async getImage() {
    const areas = await Area.find().populate('members').populate('violation');
    for (let i = 0; i < areas.length; i++) {
      const areaImage = areas[i].images?.fileId;
      const name = areaImage.split('/').pop(); // from https://api.telegram.org/file/bot5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/photos/file_9.jpg to file_9.jpg
      if (areaImage === undefined) {
        continue;
      }

      if (await checkImage(path + name)) {
        continue;
      }

      // const response = await axios.get(urlPathInfo + areaImage);
      // if (response.data.ok === false) {
      //   continue;
      // }
      // await downloadFile(areaImage, urlPathGetImage + response.data.result.file_path, '../public/images');
      await downloadFile(areaImage, '../public/images');

    }
  }

  async getViolationImage() {
    const areas = await Area.find().populate('members').populate('violation');
    for (let i = 0; i < areas.length; i++) {
      const areaViolation = areas[i].violation;
      for (let j = 0; j < areaViolation.length; j++) {
        const violationImage = areaViolation[j].image?.fileId;
        const name = violationImage.split('/').pop()
        if (violationImage === undefined) {
          continue;
        }
        if (await checkImage(path + 'Violation/' + name)) {
          continue;
        }
        // const response = await axios.get(urlPathInfo + violationImage);
        // if (response.data.ok === false) {
        //   continue;
        // }
        await downloadFile(violationImage, '../public/images/Violation');
      }
    }
  }
}

export default new GetImageService();