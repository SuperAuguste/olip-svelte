<script context="module" lang="ts">
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Card, {
        Media,
        MediaContent,
        Actions,
        ActionButtons,
        PrimaryAction
    } from "@smui/card";

    import Button, { Label } from "@smui/button";

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

<LayoutGrid style="padding: 0;">
    {#each cards as card}
        <Cell align="middle">
            <div class="cell-content">
                <Card>
                    <PrimaryAction on:click={card.action || (() => {})} ripple={!!card.action}>
                        <Media class="applications-card-media" aspectRatio="16x9" style="--background-url: url('{card.thumbnail || 'http://70.167.220.187/img/application.afe7b9e3.png'}');">
                            <MediaContent>
                                <h2
                                    class="mdc-typography--headline4"
                                    style="color: #fff; position: absolute; bottom: 16px; left: 16px; margin: 0;"
                                >
                                    {card.title}
                                </h2>
                            </MediaContent>
                        </Media>
                    </PrimaryAction>
                    {#if card.buttons}
                        <Actions>
                            <ActionButtons>
                                {#each card.buttons as button}
                                    <Button on:click={button.action}>
                                        <Label>{button.text}</Label>
                                    </Button>
                                {/each}
                            </ActionButtons>
                        </Actions>
                    {/if}
                </Card>
            </div>
        </Cell>
    {/each}
</LayoutGrid>

<!-- <div class="cards">
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
</div> -->

<style type="text/scss">
    :global(.applications-card-media) {
        --cover-color: rgba(0, 0, 0, 0.75);
        background: linear-gradient(var(--cover-color), var(--cover-color)), var(--background-url);
        background-position: center;
        background-size: cover;
    }
</style>
