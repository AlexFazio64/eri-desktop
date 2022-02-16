<script lang="ts">
	import { CREDENTIALS } from '../stores/global';
	import Command from './Command.svelte';

	let name = $CREDENTIALS.displayName;
</script>

<section>
	<p>users/{name}</p>
	<Command />
	<Command />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 60%;
	}
</style>
