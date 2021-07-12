<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return {
            props: {
                categoryId: page.params.id
            }
		}
	}
</script>

<script lang="ts">
    import { goto } from "$app/navigation";
    import * as api from "$lib/api";
    import SelectInput from "$lib/forms/SelectInput.svelte";
    import TagInput from "$lib/forms/TagInput.svelte";
    import { onMount } from "svelte";

    export let categoryId: string;
    let category: api.Category = null;

    let playlists: api.PlaylistListing[] = [];
    let playlistsMap = {};

    onMount(async () => {
        category = await api.getCategory(categoryId);
        playlists = await api.listPlaylists();
        for (let playlist of playlists) playlistsMap[playlist.id] = playlist.title;
    });

    // (await category).labels
</script>

<div class="main">
    <header>
        <h2 class="section-title">Edit Category</h2>
    </header>

    {#if category == null}
        <p>Loading...</p>
    {:else}
        <div class="form">
            {#each Object.keys(category.labels) as label}
                <div class="input-group">
                    <label for="label-{label}">Label ({label})</label>
                    <input type="text" name="label-{label}" bind:value={category.labels[label]} />
                </div>
            {/each}

            <div class="input-group">
                <label for="tags">Tags</label>
                <TagInput bind:tags={category.tags} />
            </div>

            <div class="input-group">
                <label for="playlists">Playlists</label>
                <SelectInput options={playlistsMap} bind:selected={category.playlists} />
            </div>

            <div class="button-group">
                <button class="secondary" on:click|preventDefault={() => {goto("/categories");}}>Cancel</button>
                <button on:click|preventDefault={async () => {
                    category = await api.updateCategory(categoryId, category);
                    goto("/categories");
                }}>Save</button>
            </div>
        </div>

        <pre>{JSON.stringify(category, null, 2)}</pre>
    {/if}
</div>

<style type="text/scss">
    .main {
        padding: 2rem;
    }
</style>
