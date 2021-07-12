<script lang="ts">
    import "../styles/index.scss";
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";
    
    function processResolved(resolved: [api.Application[], any, any]) {
        return [
            ...resolved[0].map(process.cardifyApplication), 
            ...resolved[1].map(process.cardifyPlaylist),
            ...resolved[2].map(process.cardifyCategory),
        ];
    }

    const loads = [api.listApplications({
        current_state: api.ApplicationState.installed,
        visible: true,
    }), api.listPlaylists(null, "anonymous"), api.listCategories()];
</script>

<div>
    <header>
        <h2 class="section-title">Content</h2>
    </header>

    {#await Promise.all(loads)}
        <p>Loading...</p>
    {:then resolved}
        <Cards
            cards={processResolved(resolved)}
        />
    {/await}
</div>

<style type="text/scss">
    div {
        padding: 2rem;
    }
</style>
