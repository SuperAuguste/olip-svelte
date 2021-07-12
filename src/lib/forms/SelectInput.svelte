<script lang="ts">
import { Log } from "oidc-client";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let options: any = [];
    export let selected: number[] = [];
</script>

<div>
    {#each [...Object.entries(options)] as [index, value]}
        <div>
            <input type="checkbox" checked={selected.indexOf(parseInt(index)) !== -1} on:change={(event) => {
                if (selected.indexOf(parseInt(index)) === -1) {
                    selected.push(parseInt(index));
                } else {
                    selected.splice(selected.indexOf(parseInt(index)), 1);
                }

                selected = selected;
            }}>
            <label>{value}</label>
        </div>
    {/each}
</div>
