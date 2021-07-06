import axios from "axios";
import * as config from "$lib/config.json";

export enum Relationship {
    Self = "self",
    Picture = "picture",
    TargetState = "target-state",
    Endpoints = "endpoints",
    DisplaySettings = "display-settings",
    Contents = "contents",
};

export enum ApplicationState {
    uninstalled = "uninstalled",
    downloaded = "downloaded",
    installed = "installed",
};

export interface Link {
    /**
     * The link's URL
     */
    href: string,
    rel: Relationship,
};

export interface Application {
    bundle: string,

    current_state: ApplicationState,
    current_version: string,
    has_content_to_upgrade: boolean,

    links: Link[],
    name: string,
    
    repository_version: string,
    target_state: ApplicationState,
    target_version: string,
    
    visible: boolean,
    weight: string,
}

async function listApplications(options: {
    /**
     * Specify whether to list uninstalled, downloaded, or installed applications
     */
    current_state: ApplicationState,
    /**
     * Specify whether you'd like (in)visible applications
     */
    visible: boolean,
    /**
     * Specify whether the applications repository should be updated before a response is returned
     * This option is rather unusual, which is why it's optional
     */
    repository_update?: boolean,
} = {
    current_state: null,
    visible: null,
    repository_update: false,
}) : Promise<{
    data: Application[],
}> {
    let url = new URL(config.api_url + "/applications/");

    if (options.current_state)
        url.searchParams.append("current_state", options.current_state);

    if (options.visible)
        url.searchParams.append("visible", options.visible.toString());

    if (options.repository_update)
        url.searchParams.append("repository_update", options.repository_update.toString());

    let req = await axios.get(url.toString());

    return req.data.data;
}

async function getAppDetail(appUrl) {
    let req = await axios.get(appUrl);

    return req.data;
}

async function getAppTargetState(appTargetStateUrl) {
    let req = await axios.get(appTargetStateUrl);

    return req.data;
}

async function setAppTargetState(appTargetStateUrl, targetState, targetVersion) {
    let state = {
        "target_state": targetState
    };

    if (targetVersion) {
        state.target_version = targetVersion;
    }

    await axios.put(appTargetStateUrl, state);
}

async function setAppDisplaySettings(appDisplaySettingUrl, visibility, weight) {
    await axios.put(appDisplaySettingUrl, {
        visible: visibility,
        weight: weight
    });
}

async function getAppContent(appContentUrl) {
    let content = await axios.get(appContentUrl);

    return content.data.data;
}

async function setContentTargetState(contentTargetState, targetState, targetVersion) {
    let state = {
        "target_state": targetState
    };

    if (targetVersion)
        state.target_version = targetVersion;
    
    try {
        return await axios.put(contentTargetState, state);
    } catch (e) {
        return e.response;
    }
}

async function listUsers() {
    let req = await axios.get(config.api_url + "/users/");

    return req.data.data;
}

async function saveUser(username, user) {
    let req = await axios.put(config.api_url + "/users/" + username, user);

    return req.data;
}

async function deleteUser(username) {
    await axios.delete(config.api_url + "/users/" + username);
}

async function listTerms() {
    let req = await axios.get(config.api_url + "/terms/");

    return req.data.data;
}

async function listCategories() {
    let req = await axios.get(config.api_url + "/categories/");
    return req.data.data;
}

async function createCategory(data) {
    let req = await axios.post(config.api_url + "/categories/", data);
    return req.data;
}

async function updateCategory(categoryUrl, data) {
    let req = await axios.put(categoryUrl, data);

    return req.data;
}

async function updateThumbnail(categoryThumbnailUrl, contentType, contentLength, content, progress) {
    await axios.put(categoryThumbnailUrl, content, {
        onUploadProgress (progressEvent) {
            progress(progressEvent.loaded)
        },
        headers: {
            "Content-Type": contentType,
            "Content-Length": contentLength
        }
    });
}

async function getCategory(categoryUrl) {
    let req = await axios.get(categoryUrl);

    return req.data;
}

async function createTerm(term) {
    let req = await axios.post(config.api_url + "/terms/", { term: term });

    return req.data;
}

async function deleteTerm(termUrl) {
    await axios.delete(termUrl);
}

async function deleteCategory(categoryId) {
    await axios.delete(config.api_url + "/categories/" + categoryId);
}

async function listApplicationEndpoints(endpointsUrl, options) {
    let url = new URL(endpointsUrl);

    let withContainers = options.withContainers;
    let withContents = options.withContents;
    let categoryId = options.categoryId;
    let playlistId = options.playlistId;

    if (withContainers)
        url.searchParams.append("with_containers", withContainers);

    if (withContents)
        url.searchParams.append("with_contents", withContents);

    if (categoryId)
        url.searchParams.append("category_id", categoryId);

    if (playlistId)
        url.searchParams.append("playlist_id", playlistId);

    let req = await axios.get(url.toString());

    return req.data.data;
}

async function getPlaylist(playlistUrl) {
    let req = await axios.get(playlistUrl);

    return req.data;
}

async function listPlaylists(categoryId, visibleForUser) {
    let url = new URL(config.api_url + "/playlists/");

    if (categoryId)
        url.searchParams.append("category_id", categoryId);

    if (visibleForUser)
        url.searchParams.append("visible_for_user", visibleForUser);

    let req = await axios.get(url.toString());

    return req.data.data;
}

async function updatePlaylist(playlistUrl, data) {
    let req = await axios.put(playlistUrl, data);

    return req.data;
}

async function createPlaylist(data) {
    let req = await axios.post(config.api_url + "/playlists/", data);

    return req.data;
}

async function deletePlaylist(playlistId) {
    await axios.delete(config.api_url + "/playlists/" + playlistId);
}

async function getConfiguration(configurationUrl) {
    let req = await axios.get(configurationUrl);

    return req.data;
}

async function putConfiguration(configurationUrl, configuration) {
    let req = await axios.put(configurationUrl, configuration);

    return req.data;
}

async function search(searched) {
    let req = await axios.get(config.api_url + `/opensearch/search?q=${searched}`, {
        responseType: "document"
    });

    return req.data;
}

async function getSysinfo() {
    let req = await axios.get(config.api_url + "/applications/sysinfo");

    return req.data;
}

async function getPlaylistLinkIconUrl(playlistId, linkIndex) {
    return `${config.api_url}/playlists/${playlistId}/link-icon/${linkIndex}`;
}

async function deletePlaylistLinkIcon(playlistId, linkIndex) {
    let url = await this.getPlaylistLinkIconUrl(playlistId, linkIndex);
    await axios.delete(url);
}

async function getCategoryLinkIconUrl(categoryId, linkIndex) {
    return `${config.api_url}/categories/${categoryId}/link-icon/${linkIndex}`;
}

async function deleteCategoryLinkIcon(categoryId, linkIndex) {
    let url = await this.getCategoryLinkIconUrl(categoryId, linkIndex);
    await axios.delete(url);
}

async function setPlaylistDisplaySettings(playlistId, weight) {
    await axios.put(config.api_url + "/playlists/display-settings", {
        id: playlistId,
        weight: weight
    });
}

async function setCategoryDisplaySettings(categoryId, weight) {
    await axios.put(config.api_url + "/categories/display-settings", {
        id: categoryId,
        weight: weight
    });
}

export {
    listApplications,
    getAppDetail,
    getAppTargetState,
    setAppTargetState,
    setAppDisplaySettings,
    getAppContent,
    setContentTargetState,
    listUsers,
    saveUser,
    deleteUser,
    listTerms,
    listCategories,
    createCategory,
    updateCategory,
    updateThumbnail,
    getCategory,
    createTerm,
    deleteTerm,
    deleteCategory,
    listApplicationEndpoints,
    getPlaylist,
    listPlaylists,
    updatePlaylist,
    createPlaylist,
    deletePlaylist,
    getConfiguration,
    putConfiguration,
    search,
    getSysinfo,
    getPlaylistLinkIconUrl,
    deletePlaylistLinkIcon,
    getCategoryLinkIconUrl,
    deleteCategoryLinkIcon,
    setPlaylistDisplaySettings,
    setCategoryDisplaySettings,
};
