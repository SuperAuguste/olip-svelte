<script lang="ts">
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";

    import LinearProgress from "@smui/linear-progress";
    
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
        <h2 class="mdc-typography--headline4">Content</h2>
    </header>

    {#await Promise.all(loads)}
        <LinearProgress indeterminate />
    {:then resolved}
        <Cards
            cards={processResolved(resolved)}
        />
    {/await}
</div>

<style type="text/scss">
    
</style>
