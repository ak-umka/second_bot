import axios from 'axios';
import Area from '../models/area.js';
import dotenv from 'dotenv';

import { isObjectEmpty } from '../helpers/isObjectEmpty.js';

dotenv.config()

const googleMapUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAP_KEY}&language=ru&latlng=`;
const yandexMapUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.YANDEX_MAP_KEY2}&format=json&geocode=`;


class AreaServiceLocation {
    async getAllAreaLocation() {
        try {
            const areas = await Area.find()
            for (let i = 0; i < areas.length; i++) {
                const areaLocation = areas[i].location;
                if (areaLocation.latitude === undefined || areaLocation.longitude === undefined) {
                    continue;
                }
                // areaLocation coordinates to degrees minutes seconds (DMS) format 
                const lat = areaLocation.latitude;
                const lng = areaLocation.longitude;
                const latDMS = lat < 0 ? 'S' + (-lat) : 'N' + lat;
                const lngDMS = lng < 0 ? 'W' + (-lng) : 'E' + lng;

                // const response = await axios.get(googleMapUrl + areaLocation.latitude + ',' + areaLocation.longitude)

                if (isObjectEmpty(areas[i].fullLocation)) {
                    const response = await axios.get(yandexMapUrl + latDMS + ',' + lngDMS)
                    console.log(response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address, 'response-yandex-map')
                    const formatted_address = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
                    areas[i].fullLocation.formatted_address = formatted_address;
                    const response_components = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                    for (let j = 0; j < response_components.length; j++) {
                        const response_component = response_components[j];
                        if (response_component.kind === 'province') {
                            areas[i].fullLocation.province = response_component.name;
                        }
                        if (response_component.kind === 'locality') {
                            areas[i].fullLocation.locality = response_component.name;
                        }
                        if (response_component.kind === 'street') {
                            areas[i].fullLocation.street = response_component.name;
                        }
                        if (response_component.kind === 'district') {
                            areas[i].fullLocation.district = response_component.name;
                        }
                        if (response_component.kind === 'house') {
                            areas[i].fullLocation.house = response_component.name;
                        }
                    }
                    await areas[i].save();
                }
            }
            return areas;
        } catch (error) {
            console.log(error)
        }
    }
    async getByArea(area) {
        try {
            const areas = await Area.find()
            if (!areas) {
                return null;
            }
            const areaLocation = areas.filter(areaItem => areaItem.fullLocation.locality === area);
            if (areaLocation.length === 0) {
                const areaLocation = areas.filter(areaItem => areaItem.fullLocation.formatted_address?.includes(area));
                return areaLocation;
            }
            return areaLocation;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const area = await Area.findByIdAndDelete(id);
            return area;
        } catch (error) {
            console.log(error)
        }
    }
}

export default new AreaServiceLocation();