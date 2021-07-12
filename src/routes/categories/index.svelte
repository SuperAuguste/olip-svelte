<script lang="ts">
    import { goto } from "$app/navigation";
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";
    import { onMount } from "svelte";

    let resolveCategories;
    const categories: Promise<api.CategoryListing[]> = new Promise(resolve => {resolveCategories = resolve;});

    onMount(async () => {
        resolveCategories(await api.listCategories());
    });
</script>

<div>
    <header>
        <h2 class="section-title">Categories</h2>
        <a href="/categories/new/edit">New Category</a>
    </header>

    {#await categories}
        <p>Loading...</p>
    {:then resolved}
        <Cards
            cards={resolved.map(process.cardifyCategory).map((_, i) => ({..._, buttons: [{
                text: "Edit",
                action () {
                    goto(`/categories/${resolved[i].id}/edit`);
                }
            }]}))}
        />
    {/await}
</div>

<style type="text/scss">
    div {
        padding: 2rem;
    }
</style>
