<script lang="ts">
    import { auth } from "./auth";
    import Drawer, { AppContent, Content, Header } from '@smui/drawer';
    import List, { Item, Text } from '@smui/list';
    let isAuthenticated = auth.isAuthenticated;

    export let path: string;
    const items = [
        { href: "/", title: "Home" },
        { href: "/playlists", title: "Playlists" },

        { href: "/applications", title: "Applications", authRequired: true },
        { href: "/categories", title: "Categories", authRequired: true }
    ];
</script>
<Drawer>
    <Header>
        <input type="text" class="search" placeholder="Search">
    </Header>

    <Content>
        <List>
            {#each items as item}
                {#if !item.authRequired || (item.authRequired && $isAuthenticated)}
                    <Item href={item.href} activated={item.href == "/" ? path == '/' : path.startsWith(item.href)}>
                        <Text>{item.title}</Text>
                    </Item>
                {/if}
            {/each}
        </List>
    </Content>
</Drawer>
    <!-- <div>
        <div class="items">

            
        </div>

        {#if $isAuthenticated}
            <button class="btn" on:click|preventDefault="{() => auth.logout() }">Logout</button>
        {:else}
            <button class="btn" on:click|preventDefault="{() => auth.login(true) }">Login</button>
        {/if}
    </div>
</nav> -->
