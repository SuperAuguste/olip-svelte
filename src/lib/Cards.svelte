<script>
    export var cards;
</script>

<div class="cards">
    {#each cards as card}
        <div
            style="--background-url: url('{card.thumbnail || 'http://70.167.220.187/img/application.afe7b9e3.png'}');"
        >
            <span class="title">{card.title}</span>
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

            & > .title {
                display: block;

                padding: 1.5rem;

                color: var(--preview-text-color);
                font-size: 1.5em;
                font-weight: 700;
            }
        }
    }

    .title {
        font-size: 1em;
    }
</style>
