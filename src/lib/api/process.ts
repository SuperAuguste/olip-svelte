import * as api from "./index";

export function cardifyApplication(application: api.Application) {
    return {
        title: application.name,
        thumbnail: application.links.find(_ => _.rel == api.Relationship.Picture).href
    };
}

export function cardifyPlaylist(playlist) {
    return {
        title: playlist.title,
        thumbnail: "http://70.167.220.187/img/playlist.16a237f2.png"
    };
}

export function cardifyCategory(category) {
    return {
        title: category.labels.en,
        thumbnail: "http://70.167.220.187/img/category.5873a233.png"
    };
}
