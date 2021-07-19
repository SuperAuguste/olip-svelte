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
    import TagInput from "$lib/forms/TagInput.svelte";
    import { onMount } from "svelte";

    import Button from "@smui/button";
    import Textfield from "@smui/textfield";
    import List, { Item, Meta, Label } from "@smui/list";
    import Checkbox from "@smui/checkbox";

    export let categoryId: string;
    let category: api.Category = null;

    let playlists: api.PlaylistListing[] = [];
    let playlistsMap = [];

    onMount(async () => {
        category = await api.getCategory(categoryId);
        playlists = await api.listPlaylists();
        for (let playlist of playlists) playlistsMap.push({label: playlist.title, value: playlist.id});
        playlistsMap = playlistsMap;
    });

    // (await category).labels
</script>

<header>
    <h2 class="section-title">Edit Category</h2>
</header>

{#if category == null}
    <p>Loading...</p>
{:else}
    <div class="form">
        {#each Object.keys(category.labels) as label}
            <Textfield bind:value={category.labels[label]} label="Label ({label})"></Textfield>
        {/each}

        <div class="input-group">
            <label for="tags">Tags</label>
            <TagInput bind:tags={category.tags} />
        </div>

        <List checkList>
            {#each playlistsMap as p}
                <Item>
                    <Label>{p.label}</Label>
                    <Meta>
                        <Checkbox bind:group={category.playlists} value={p.value} />
                    </Meta>
                </Item>
            {/each}
        </List>

        <div class="buttons">
            <Button color="secondary" on:click={() => {goto("/categories");}}>Cancel</Button>
            <Button variant="unelevated" on:click={async () => {
                category = await api.updateCategory(categoryId, category);
                goto("/categories");
            }}>Save</Button>
        </div>
    </div>

    <pre>{JSON.stringify(category, null, 2)}</pre>
{/if}

<style type="text/scss">
    .buttons {
        margin-top: 1rem;
    }
</style>
