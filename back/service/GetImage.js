import axios from 'axios';

import Area from '../models/area.js';
import downloadFile from '../helpers/downloadFile.js';
import { checkImage } from '../helpers/checkImage.js';

const urlPathInfo = `https://api.telegram.org/5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/getFile?file_id=`;
const urlPathGetImage = `https://api.telegram.org/file/5928167599:AAGjlw6lyVfwuN0rIh_nVR6kg2QUm-4kGj8/`;

const path = '/Users/umka/Desktop/tg-back-front/back/public/images/';
const ubuntuPath = '/home/ubuntu/tg-back-front/back/public/images/';
class GetImageService {
  async getImage() {
    const areas = await Area.find().populate('members').populate('violation');
    for (let i = 0; i < areas.length; i++) {
      const areaImage = areas[i].images?.fileId;
      if (areaImage === undefined) {
        continue;
      }

      if (await checkImage(ubuntuPath + areaImage + '.jpg')) {
        continue;
      }

      const response = await axios.get(urlPathInfo + areaImage);
      if (response.data.ok === false) {
        continue;
      }
      await downloadFile(areaImage, urlPathGetImage + response.data.result.file_path, '../public/images');

    }
  }

  async getViolationImage() {
    const areas = await Area.find().populate('members').populate('violation');
    for (let i = 0; i < areas.length; i++) {
      const areaViolation = areas[i].violation;
      for (let j = 0; j < areaViolation.length; j++) {
        const violationImage = areaViolation[j].image?.fileId;
        if (violationImage === undefined) {
          continue;
        }
        if (await checkImage(ubuntuPath + 'Violation/' + violationImage + '.jpg')) {
          continue;
        }
        const response = await axios.get(urlPathInfo + violationImage);
        if (response.data.ok === false) {
          continue;
        }
        await downloadFile(violationImage, urlPathGetImage + response.data.result.file_path, '../public/images/Violation');
      }
    }
  }
}

export default new GetImageService();