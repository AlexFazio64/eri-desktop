<script lang="ts">
	import Profile from '$lib/Profile.svelte';
	import CommandCenter from '$lib/CommandCenter.svelte';
</script>

<main>
	<Profile />
	<CommandCenter />
</main>

<style>
	main {
		padding: 3em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3em;
	}
</style>
