<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return {
            props: {
                navPath: page.path
            }
		}
	}
</script>

<script>
    import Drawer, { AppContent, Content } from '@smui/drawer';
    import List, { Item, Text } from '@smui/list';

    import { auth } from "$lib/auth";
    import { onMount } from "svelte";
    import Nav from "$lib/Nav.svelte";

    onMount(async () => {
        await auth.onMount();
    });

    export let navPath;
</script>

<div class="top">
    <Nav path={navPath} />

    <AppContent class="app-content">
        <main class="main-content">
            <slot />
        </main>
    </AppContent>
</div>

<style lang="scss">
    .top {
        display: flex;
    }

    * :global(.app-content) {
        flex: auto;
        overflow: auto;
        position: relative;
        flex-grow: 1;
    }
 
    .main-content {
        overflow: auto;
        padding: 2.5em;
        height: 100%;
        box-sizing: border-box;
    }
</style>
