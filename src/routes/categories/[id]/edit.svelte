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
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";
    import { onMount } from "svelte";

    export let categoryId: string;
    let category: api.Category = null;

    onMount(async () => {
        category = await api.getCategory(categoryId);
    });

    // (await category).labels
</script>

<div>
    <h2 class="section-title">Categories</h2>

    {#if category == null}
        <p>Loading...</p>
    {:else}
        <form>
            {#each Object.keys(category.labels) as label}
                <label for="label-{label}">Label ({label})</label>
                <input type="text" name="label-{label}" bind:value={category.labels[label]} />
            {/each}

            <input type="submit" value="Submit" on:click|preventDefault={async () => {category = await api.updateCategory(categoryId, category)}}>
        </form>

        <pre>{JSON.stringify(category, null, 2)}</pre>
    {/if}
</div>

<style type="text/scss">
    div {
        padding: 2rem;
    }
</style>
