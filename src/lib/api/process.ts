import * as api from "./index";
import type { Card } from "$lib/Cards.svelte";
import { goto } from "$app/navigation";
import axios from "axios";

export function cardifyApplication(application: api.Application): Card {
    return {
        title: application.name,
        thumbnail: application.links.find(_ => _.rel == api.Relationship.Picture).href,
        async action () {
            const endp = await axios.get(application.links.find(_ => _.rel == api.Relationship.Endpoints).href);
            goto(endp.data.data[0].url);
        }
    };
}

export function cardifyPlaylist(playlist): Card {
    return {
        title: playlist.title,
        thumbnail: "http://70.167.220.187/img/playlist.16a237f2.png"
    };
}

export function cardifyCategory(category: api.CategoryListing): Card {
    return {
        title: category.labels.en,
        thumbnail: "http://70.167.220.187/img/category.5873a233.png"
    };
}
