<script lang="ts">
	import { get, ref, set, onValue } from 'firebase/database';
	import { beforeUpdate, onMount } from 'svelte';
	import { CREDENTIALS, DB } from '../stores/global';

	let result = '';
	let value = '';

	const read = () => {
		get(ref($DB, `users/${$CREDENTIALS.user.displayName}`)).then((snap) => {
			result = snap.val();
		});
	};

	const write = async () => {
		await set(ref($DB, `users/${$CREDENTIALS.user.displayName}`), value);
	};

	beforeUpdate(() => {
		if ($CREDENTIALS != undefined)
			onValue(ref($DB, `users/${$CREDENTIALS.user.displayName}`), (data) => {
				result = data.exists() ? data.val() : result;
			});
	});
</script>

<p>users/</p>
<form id="set" on:submit|preventDefault={write}>
	<div>
		<input type="submit" value="set" />
		<input type="text" bind:value />
	</div>
</form>
<div>
	<input type="button" on:click={read} value="get" />
	<textarea readonly>{result}</textarea>
</div>

<style>
	div {
		gap: 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
