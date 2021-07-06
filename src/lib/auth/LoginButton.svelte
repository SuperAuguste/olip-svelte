<script>
    import { auth } from ".";
    export let redirectUrl = auth.settings.redirect_uri;
    export let preserveRoute = true;
</script>

<button class="btn" on:click|preventDefault="{() => auth.login(preserveRoute, redirectUrl) }"><slot></slot></button>
