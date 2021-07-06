<script>
    import "../styles/index.scss";
    import Nav from "$lib/Nav.svelte";

    import { auth } from "$lib/auth";
    import { onMount } from "svelte";

    onMount(async () => {
        await auth.onMount();
    });
</script>

<div>
    <Nav />
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
