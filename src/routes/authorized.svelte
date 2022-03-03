<script lang="ts">
	import Profile from '$lib/Profile.svelte';
	import CommandCenter from '$lib/CommandCenter.svelte';
	import { get, ref, set } from 'firebase/database';
	import { AUTH, DB, ID } from '../stores/global';
	import { onMount } from 'svelte';
	import { v4 } from '@lukeed/uuid';

	let device = 'unnamed';

	onMount(() => {
		try {
			if ($AUTH != undefined) {
				let path = 'users/' + $ID + '/device/name';
				get(ref($DB, path)).then((data) => {
					if (data.exists()) {
						device = data.val();
					} else {
						let value = v4();
						set(ref($DB, path), value).then(() => (device = value));
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	});
</script>

<main>
	{#if $AUTH.currentUser != undefined}
		<Profile {device} />
		<CommandCenter />
	{/if}
</main>

<style>
	main {
		padding: 3em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2em;
	}
</style>
