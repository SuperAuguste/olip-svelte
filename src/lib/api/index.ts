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

export interface Label {
    ab?: string,
    aa?: string,
    af?: string,
    sq?: string,
    am?: string,
    ar?: string,
    hy?: string,
    as?: string,
    ay?: string,
    az?: string,
    ba?: string,
    eu?: string,
    bn?: string,
    dz?: string,
    bh?: string,
    bi?: string,
    br?: string,
    bg?: string,
    my?: string,
    be?: string,
    km?: string,
    ca?: string,
    zh?: string,
    co?: string,
    hr?: string,
    cs?: string,
    da?: string,
    nl?: string,
    en?: string,
    eo?: string,
    et?: string,
    fo?: string,
    fj?: string,
    fi?: string,
    fr?: string,
    fy?: string,
    gd?: string,
    gl?: string,
    ka?: string,
    de?: string,
    el?: string,
    kl?: string,
    gn?: string,
    gu?: string,
    ha?: string,
    iw?: string,
    hi?: string,
    hu?: string,
    is?: string,
    in?: string,
    ia?: string,
    ie?: string,
    ik?: string,
    ga?: string,
    it?: string,
    ja?: string,
    jw?: string,
    kn?: string,
    ks?: string,
    kk?: string,
    rw?: string,
    ky?: string,
    rn?: string,
    ko?: string,
    ku?: string,
    lo?: string,
    la?: string,
    lv?: string,
    ln?: string,
    lt?: string,
    mk?: string,
    mg?: string,
    ms?: string,
    ml?: string,
    mt?: string,
    mi?: string,
    mr?: string,
    mo?: string,
    mn?: string,
    na?: string,
    ne?: string,
    no?: string,
    oc?: string,
    or?: string,
    om?: string,
    ps?: string,
    fa?: string,
    pl?: string,
    pt?: string,
    pa?: string,
    qu?: string,
    rm?: string,
    ro?: string,
    ru?: string,
    sm?: string,
    sg?: string,
    sa?: string,
    sr?: string,
    sh?: string,
    st?: string,
    tn?: string,
    sn?: string,
    sd?: string,
    si?: string,
    ss?: string,
    sk?: string,
    sl?: string,
    so?: string,
    es?: string,
    su?: string,
    sw?: string,
    sv?: string,
    tl?: string,
    tg?: string,
    ta?: string,
    tt?: string,
    te?: string,
    th?: string,
    bo?: string,
    ti?: string,
    to?: string,
    ts?: string,
    tr?: string,
    tk?: string,
    tw?: string,
    uk?: string,
    ur?: string,
    uz?: string,
    vi?: string,
    vo?: string,
    cy?: string,
    wo?: string,
    xh?: string,
    ji?: string,
    yo?: string,
    zu?: string,
}

export interface CategoryListing {
    id: number,
    labels: Label,
    links: Link[],
    tags: string[]
}

export interface Content {
    bundle: string,
    content_id: string
}

export interface Category {
    applications: string[],
    contents: Content[],
    id: number,
    labels: Label,
    links: Link[],
    playlists: number[],
    tags: string[]
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
}) : Promise<Application[]> {
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

async function listCategories(): Promise<CategoryListing[]> {
    let req = await axios.get(config.api_url + "/categories/");
    return req.data.data;
}

async function createCategory(data) {
    let req = await axios.post(config.api_url + "/categories/", data);
    return req.data;
}

async function updateCategory(categoryId: string | number, data: Category): Promise<Category> {
    const copiedData = {...data};
    delete copiedData.id;

    if (!copiedData.contents) copiedData.contents = [];
    if (!copiedData.directLinks) copiedData.directLinks = [];

    let req = await axios.put(`${config.api_url}/categories/${categoryId}`, copiedData);

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

async function getCategory(categoryId: string | number): Promise<Category> {
    let req = await axios.get(`${config.api_url}/categories/${categoryId}`);

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
