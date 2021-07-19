<script lang="ts">
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";    
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
    <header>
        <h2 class="section-title">Content</h2>
    </header>

    {#await applications}
        <p>Loading...</p>
    {:then resolved}
        <!-- <Cards
            cards={resolved.map(process.cardifyApplication)}
        /> -->
        
    {/await}
</div>

<style type="text/scss">
    .cell-content {
        // height: 300px;
    }

    :global(.applications-card-media) {
        --cover-color: rgba(0, 0, 0, 0.75);
        background: linear-gradient(var(--cover-color), var(--cover-color)), var(--background-url);
        background-position: center;
        background-size: cover;
    }
</style>
