<script lang="ts">
    import { goto } from "$app/navigation";
    import * as api from "$lib/api";
    import * as process from "$lib/api/process";
    import Cards from "$lib/Cards.svelte";
    import { onMount } from "svelte";

    import Dialog, { Title, Content, Actions, InitialFocus } from "@smui/dialog";
    import Button, { Label, Icon } from "@smui/button";
    import LinearProgress from "@smui/linear-progress";

    let categories: api.CategoryListing[] = null;

    let deleteDialogOpen = false;
    let deleteDialogId = undefined;

    onMount(async () => {
        categories = await api.listCategories();
    });
</script>

<div>
    <header>
        <h2 class="mdc-typography--headline4">Categories</h2>
        <Button href="/categories/new/edit" variant="raised">
            <Label>New Category</Label>
            <Icon class="material-icons">add</Icon>
        </Button>
    </header>

    <Dialog
        bind:open={deleteDialogOpen}
        aria-labelledby="default-focus-title"
        aria-describedby="default-focus-content"
    >
        <Title id="default-focus-title">Delete Category</Title>
        <Content id="default-focus-content">Please confirm you want to delete this category.</Content>
        <Actions>
            <Button on:click={() => (deleteDialogOpen = false)}>
                <Label>Cancel</Label>
            </Button>
            <Button
                default
                use={[InitialFocus]}
                on:click={async () => {
                    await api.deleteCategory(deleteDialogId);
                    categories = await api.listCategories();
                    deleteDialogOpen = false;
                }}
            >
                <Label>Delete</Label>
            </Button>
        </Actions>
    </Dialog>

    {#if categories == null}
        <LinearProgress indeterminate />
    {:else}
        <Cards
            cards={categories.map(process.cardifyCategory).map((_, i) => ({..._, buttons: [
                {
                    text: "Edit",
                    action () {
                        goto(`/categories/${categories[i].id}/edit`);
                    }
                },
                {
                    text: "Delete",
                    action () {
                        deleteDialogOpen = true;
                        deleteDialogId = categories[i].id;
                    }
                }
            ]}))}
        />
    {/if}
</div>

<style type="text/scss">
    header {
        display: flex;
        margin-bottom: 0.83em;

        flex-direction: row;

        align-items: center;
        justify-content: space-between;
    }
</style>
