<script lang="ts">
    let newTag = "";
    export let tags: string[] = [];
</script>

<div>
    {#each tags as tag, index}
        <span class="tag">{tag} <span class="remove" on:click={() => {
            tags.splice(index, 1);
            tags = tags;
        }}>+</span></span>
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
    .tag {
        display: inline-block;

        margin-right: 0.2em;

        border: 2px solid black;
        border-radius: 50px;

        padding: 0.6em 1.4em;

        font-weight: 600;

        &>.remove {
            display: inline-block;

            margin-left: 0.2em;

            line-height: 0.5em;

            cursor: pointer;
            transform: rotate(45deg);
            vertical-align: middle;
        }
    }
</style>
