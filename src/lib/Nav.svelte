<script lang="ts">
    import { auth } from "./auth";
    let isAuthenticated = auth.isAuthenticated;

    export let path: string;
    const items = [
        { href: "/", title: "Home" },
        { href: "/playlists", title: "Playlists" },

        { href: "/applications", title: "Applications", authRequired: true },
        { href: "/categories", title: "Categories", authRequired: true }
    ];
</script>

<nav>
    <div>
        <div class="items">
            <input type="text" class="search" placeholder="Search">

            {#each items as item}
                {#if !item.authRequired || (item.authRequired && $isAuthenticated)}
                    <a href={item.href} class:active={item.href == "/" ? path == '/' : path.startsWith(item.href)}>{item.title}</a>
                {/if}
            {/each}
        </div>

        {#if $isAuthenticated}
            <button class="btn" on:click|preventDefault="{() => auth.logout() }">Logout</button>
        {:else}
            <button class="btn" on:click|preventDefault="{() => auth.login(true) }">Login</button>
        {/if}
    </div>
</nav>

<style lang="scss">
    img {
        display: block;

        margin: auto;

        width: 7.5rem;
    }

    nav {
        padding: 1rem;
        padding-right: 0;

        width: 15rem;
        height: 100%;
    }

    nav>div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        border-radius: 5px;

        padding: 1rem;

        width: 100%;
        height: 100%;

        box-shadow: 0.5px 0.5px 10px rgb(218, 218, 218);
        background-color: white;
    }

    .items {
        margin: 0;
        padding: 0;

        &>.search {
            display: block;
            
            margin-bottom: 0.75rem;

            width: 100%;

            font-size: 0.65em;
        }

        &>a {
            display: block;

            margin-bottom: 0.5rem;

            color: var(--text-color);
            font-size: 1em;
            font-weight: 600;
            text-decoration: none;

            &.active {
                color: #ea3250;
            }
        }
    }

    button {
        align-self: flex-end;
    
        width: 100%;

        font-size: 0.65em;
    }
</style>
