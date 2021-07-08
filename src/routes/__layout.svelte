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
    import "../styles/index.scss";
    import Nav from "$lib/Nav.svelte";

    import { auth } from "$lib/auth";
    import { onMount } from "svelte";

    onMount(async () => {
        await auth.onMount();
    });

    export let navPath;
</script>

<div>
    <Nav path={navPath} />
    <main>
        <slot />
    </main>
</div>

<style>
    div {
        display: flex;
        overflow: hidden;

        height: 100vh;
        width: 100vw;
    }

    main {
        width: 100%;
        overflow: auto;
    }
</style>
