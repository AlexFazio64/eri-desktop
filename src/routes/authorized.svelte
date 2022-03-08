<script lang="ts">
	import Profile from '$lib/Profile.svelte';
	import CommandCenter from '$lib/CommandCenter.svelte';
	import { AUTH } from '../stores/global';
</script>

<main>
	{#if $AUTH.currentUser != undefined}
		<Profile/>
		<CommandCenter />
	{/if}
</main>

<style>
	main {
		padding: 2.5em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2em;
		/* width: 60%; */
	}
</style>
