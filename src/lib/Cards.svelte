<script context="module" lang="ts">
    export interface CardButton {
        text: string,
        action: () => void,
    }

    export interface Card {
        title: string,
        thumbnail: string,
        buttons?: CardButton[],
    }
</script>

<script lang="ts">
    export var cards: Card[];
</script>

<div class="cards">
    {#each cards as card}
        <div
            style="--background-url: url('{card.thumbnail || 'http://70.167.220.187/img/application.afe7b9e3.png'}');"
        >
            <span class="title">{card.title}</span>

            {#if card.buttons}
                <div class="buttons">
                    {#each card.buttons as button}
                        <button on:click={button.action} class="rounded">{button.text}</button>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style type="text/scss">
    .cards {
        display: grid;

        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));

        & > * {
            position: relative;

            border-radius: 3px;

            min-height: 8rem;

            cursor: pointer;
            transition: 0.2s background-size;
            background: linear-gradient(var(--cover-color), var(--cover-color)),
                var(--background-url);
            background-repeat: no-repeat;
            background-size: cover;

            padding: 1.5rem;

            display: flex;
            flex-direction: column;
            gap: 1rem;

            & > .title {
                display: block;

                color: var(--preview-text-color);
                font-size: 1.5em;
                font-weight: 700;
            }

            .buttons {
                display: flex;
                flex-direction: row;
                flex-direction: row-reverse;

                margin-top: auto;
            }

            button {
                font-size: 0.75em;
            }
        }
    }

    button {
        border: none;
        border-radius: 3px;

        padding: 0.6em 2.8em;

        color: black;
        font-size: 1em;
        font-weight: 900;

        cursor: pointer;
        background-color: white;
    }
</style>
