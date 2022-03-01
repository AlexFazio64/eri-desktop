<script lang="ts">
	import { get, ref, set, onValue } from 'firebase/database';
	import { DB, ID } from '../stores/global';

	let result = '';
	let value = '';

	const read = () => {
		get(ref($DB, `users/${$ID}/command`)).then((snap) => {
			result = snap.val();
		});
	};

	const write = async () => {
		await set(ref($DB, `users/${$ID}/command`), value);
	};

	onValue(ref($DB, `users/${$ID}/command`), (data) => {
		result = data.exists() ? data.val() : result;
	});
</script>

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
