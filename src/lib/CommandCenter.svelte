<script lang="ts">
	import { EXE_PATH } from '../stores/global';
	import ProgramList from './ProgramList.svelte';

	export let name = 'AlexFazio64';
	const save = () => {
		const serial = JSON.stringify(Array.from($EXE_PATH.entries()));
		console.log(serial);

		try {
			const fs = require('fs');
			fs.writeFile('program.json', serial, (err) => {
				if (err) {
					console.log(err);
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<section>
	<p>users/{name}</p>
	<ProgramList />
	<button on:click={save}>dump to json</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 60%;
	}
</style>
