import Area from "../models/area.js";
import GetImageService from "../service/GetImage.js";
import AreaServiceLocation from "../service/AreaLocation.js";
class AreaController {
    async getAllAreas(req, res) {
        try {
            const location = await AreaServiceLocation.getAllAreaLocation();
            res.status(200).json(location);
        } catch (error) {
            console.log(error);
        }
    }
    async getAreaImage(req, res) {
        try {
            await GetImageService.getImage();
            res.status(200).json("ok");
        } catch (error) {
            console.log(error);
        }
    }
    async getViolationImage(req, res) {
        try {
            await GetImageService.getViolationImage();
            res.status(200).json("ok");
        } catch (error) {
            console.log(error);
        }
    }
    async searchArea(req, res) {
        try {
            const userQuery = await req.query;
            const searchQuery = {
                $and: []
            };
            for (const key in userQuery) {
                const query = {};
                query[`fullLocation.${key}`] = userQuery[key];
                searchQuery.$and.push(query);
            }
            const filteredAreas = await Area.find(searchQuery);
            // http://localhost:3000/api/V0/search?locality=Киев&political=Киевская%20область&route=Киевская%20область&street_number=Киевская%20область
            res.status(200).json(filteredAreas);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AreaController();