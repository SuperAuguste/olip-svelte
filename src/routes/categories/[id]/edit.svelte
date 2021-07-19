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
    import LinearProgress from "@smui/linear-progress";

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
</script>

<header>
    <h2 class="mdc-typography--headline4">Edit Category</h2>
</header>

{#if category == null}
    <LinearProgress indeterminate />
{:else}
    <div class="form">
        {#each Object.keys(category.labels) as label}
            <div class="input-group">
                <Textfield bind:value={category.labels[label]} label="Label ({label})"></Textfield>
            </div>
        {/each}

        <div class="input-group">
            <label class="mdc-typography--subtitle2">Tags</label>
            <TagInput bind:tags={category.tags} />
        </div>

        <div class="input-group">
            <List checkList>
                {#each playlistsMap as p}
                    <Item>
                        <Checkbox bind:group={category.playlists} value={p.value} />
                        <Label>{p.label}</Label>
                    </Item>
                {/each}
            </List>
        </div>

        <div class="input-group">
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
    .input-group {
        margin-bottom: 1rem;
    }
</style>
