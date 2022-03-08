<script lang="ts">
	import { EXE_PATH } from '../stores/global';
	import ProgramList from './ProgramList.svelte';

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
	<ProgramList />
</section>
<button class="floppy" on:click={save}>
	<span class="material-icons">save</span>
</button>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		/* width: 100%; */
		box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 50%);
		border-radius: 1em;
	}

	button.floppy {
		cursor: pointer;
		display: grid;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 1em;
		border: none;
		border-radius: 4em;
		width: 50px;
		background-color: rgb(78, 91, 167);
		color: white;
		aspect-ratio: 1/1;
	}
</style>
