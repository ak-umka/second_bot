import Area from "../models/area.js";

class AreaService {
    async createArea(fullname, location, username, pollingStation) {
        // check address is string
        // if (typeof address !== 'string' || address === '') {
        //     throw new Error('Address is not string');
        // }
        const area = new Area({
            fullname: fullname,
            username: username,
            pollingStation: pollingStation,
        });
        area.location.latitude = location.latitude;
        area.location.longitude = location.longitude;
        await area.save();
        return area;
    }

    async updateCountMembers(countMembers, areaId) {
        const area = await Area.findById({ _id: areaId });
        // area.members.count = countMembers;
        area.members.push({ count: countMembers });
        await area.save();
        return area;
    };

    async createImage(image, areaId) {
        const area = await Area.findById({ _id: areaId });
        // if (Array.isArray(image)) {
        //     const lastObject = image[image.length - 1];
        //     area.images.fileId = lastObject.file_id;
        // } else {
        //     area.images.fileId = image.file_id;
        // }
        area.images.fileId = image;
        await area.save();
        return area;
    };

    async createViolationImage(violationImage, areaId) {
        const area = await Area.findById({ _id: areaId });
        if (Array.isArray(violationImage)) {
            const lastObject = violationImage[violationImage.length - 1];
            area.violation.push({ image: { fileId: lastObject.file_id } });
        } else {
            area.violation.push({ image: { fileId: violationImage.file_id } });
        }
        await area.save();
        return area;
    }

    async createViolationDescription(description, areaId) {
        const area = await Area.findById({ _id: areaId });
        const lastObject = area.violation[area.violation.length - 1];
        lastObject.description = description;
        await area.save();
        return area;
    }

}

export default new AreaService();