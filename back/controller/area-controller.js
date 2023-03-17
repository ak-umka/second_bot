import Area from "../models/area.js";
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
    async getArea(req, res) {
        try {
            const area = await AreaServiceLocation.getByArea(req.params.area);
            res.status(200).json(area);
        } catch (error) {
            console.log(error)
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
    async deleteArea(req, res) {
        try {
            const area = await AreaServiceLocation.deleteById(req.params.id);
            res.status(200).json(area);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AreaController();