<script lang="ts">
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";
    import { onMount } from "svelte";

    let resolveApplications;
    const applications: Promise<api.Application[]> = new Promise(resolve => {resolveApplications = resolve;});

    onMount(async () => {
        resolveApplications(await api.listApplications({
            current_state: null,
            visible: true,
        }));
    });
</script>

<div>
    <h2 class="section-title">Content</h2>

    {#await applications}
        <p>Loading...</p>
    {:then resolved}
        <Cards
            cards={resolved.map(process.cardifyApplication)}
        />
    {/await}
</div>

<style type="text/scss">
    div {
        padding: 2rem;
    }
</style>
