<script>
    import LoginButton from "$lib/auth/LoginButton.svelte";
    import LogoutButton from "$lib/auth/LogoutButton.svelte";
    
    import { auth } from "./auth";
    let isAuthenticated = auth.isAuthenticated;
</script>

<nav>
    <img src="/olip.svg" alt="">

    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/applications">Applications</a></li>

        {#if $isAuthenticated}
            <LogoutButton>Logout!</LogoutButton>
        {:else}
            <LoginButton>Login!</LoginButton>
        {/if}
    </ul>
</nav>

<style lang="scss">
    img {
        display: block;

        margin: auto;

        width: 7.5rem;
    }

    nav {
        padding: 2rem 1rem;

        width: 10rem;
        // width: 220px;
        height: 100%;
    }

    ul {
        margin: 0;
        margin-top: 1rem;
        padding: 0;

        list-style: none;

        & > li {
            display: block;

            margin-bottom: 0.25rem;

            & > a {
                color: var(--link-color);
                font-weight: 600;
                text-decoration: none;
            }
        }
    }
</style>
