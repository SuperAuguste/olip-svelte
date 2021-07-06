<script>
    import { auth } from ".";
    export let redirectUrl = auth.settings.post_logout_redirect_uri;
</script>

<button class="btn" on:click|preventDefault="{() => auth.logout(redirectUrl) }"><slot></slot></button>
