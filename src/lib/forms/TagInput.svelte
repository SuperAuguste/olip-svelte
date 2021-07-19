<script lang="ts">
    import Button, { Group, GroupItem, Label, Icon } from '@smui/button';

    let newTag = "";
    export let tags: string[] = [];
</script>

<div>
    {#each tags as tag, index}
        <Group variant="raised" class="tag">
            <Button on:click={() => clicked++} variant="raised">
                <Label>{tag}</Label>
            </Button>
            <Button
                on:click={() => {
                    tags.splice(index, 1);
                    tags = tags;
                }}
                variant="raised"
                style="padding: 0; min-width: 36px;"
            >
                <Icon class="material-icons" style="margin: 0;">close</Icon>
            </Button>
        </Group>
    {/each}

    <input type="text" on:keypress={(event) => {
        if (event.key === "Enter" && newTag.trim() && tags.indexOf(newTag.trim()) === -1) {
            tags.push(newTag);
            newTag = "";
            tags = tags;
        }
    }} bind:value={newTag} placeholder="New tag" />
</div>

<style lang="scss">
    :global(.tag) {
        margin-right: 0.5rem;
    }
</style>
