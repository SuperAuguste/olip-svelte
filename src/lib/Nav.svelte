<script lang="ts">
    import { auth } from "./auth";

    import Drawer, { AppContent, Content, Header } from "@smui/drawer";
    import List, { Item, Text, Separator, Graphic } from "@smui/list";

    let isAuthenticated = auth.isAuthenticated;
    let searchValue: string = "";

    export let path: string;
    const items = [
        { href: "/search", title: "Search", graphic: "search" },
        { href: "/", title: "Home", graphic: "home" },
        { href: "/playlists", title: "Playlists", graphic: "playlist_play" },

        { href: "/applications", title: "Applications", graphic: "apps", authRequired: true },
        { href: "/categories", title: "Categories", graphic: "class", authRequired: true }
    ];
</script>
<Drawer>
    <Header>
        <img src="/olip.svg" alt="">
    </Header>

    <Content>
        <List>
            {#each items as item}
                {#if !item.authRequired || (item.authRequired && $isAuthenticated)}
                    <Item href={item.href} activated={item.href == "/" ? path == '/' : path.startsWith(item.href)}>
                        {#if item.graphic}
                            <Graphic class="material-icons" aria-hidden="true">{item.graphic}</Graphic>
                        {/if}
                        <Text>{item.title}</Text>
                    </Item>
                {/if}
            {/each}

            <Separator />

            {#if $isAuthenticated}
                <Item on:click="{() => auth.logout() }">
                    <Graphic class="material-icons" aria-hidden="true">exit_to_app</Graphic>
                    <Text>Logout</Text>
                </Item>
            {:else}
                <Item on:click="{() => auth.login(true) }">
                    <Graphic class="material-icons" aria-hidden="true">account_box</Graphic>
                    <Text>Login</Text>
                </Item>
            {/if}
        </List>
    </Content>
</Drawer>

<style lang="scss">
    img {
        display: block;

        margin-top: 1rem;
        margin-bottom: 1rem;

        width: 100%;
    }
</style>
