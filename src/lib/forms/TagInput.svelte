<script lang="ts">
    import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
    import Textfield from "@smui/textfield";

    let newTag = "";
    export let tags: string[] = [];
</script>

<div>
    {#each tags as tag, index}
        <Group variant="outlined" class="tag">
            <Button variant="outlined">
                <Label>{tag}</Label>
            </Button>
            <Button
                on:click={() => {
                    tags.splice(index, 1);
                    tags = tags;
                }}
                variant="outlined"
                style="padding: 0; min-width: 36px;"
            >
                <Icon class="material-icons" style="margin: 0;">close</Icon>
            </Button>
        </Group>
    {/each}

    <Textfield bind:value={newTag} label="New Tag" on:keypress={(event) => {
        if (event.key === "Enter" && newTag.trim() && tags.indexOf(newTag.trim()) === -1) {
            tags.push(newTag);
            newTag = "";
            tags = tags;
        }
    }}></Textfield>
    <!-- <input type="text"  bind:value={newTag} placeholder="New tag" /> -->
</div>

<style lang="scss">
    :global(.tag) {
        margin-right: 0.5rem;
    }
</style>
