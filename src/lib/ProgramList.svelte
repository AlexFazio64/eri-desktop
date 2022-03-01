<script lang="ts">
	import { onValue, ref } from 'firebase/database';
	import { AUTH, DB } from '../stores/global';
	import Program from './Program.svelte';

	const restored = () => {
		const fs = require('fs');

		const programs = [
			['music', { path: '', program: 'spotify' }],
			['messanging', { path: '', program: 'whatsapp' }],
			['editing', { path: '', program: 'photoshop' }],
			['term', { path: '', program: 'powershell' }],
			['text_editor', { path: '', program: 'vscode' }],
			['office', { path: '', program: 'word' }],
			['game_launcher', { path: '', program: 'steam' }]
		];

		let array = programs;
		let extracted;

		try {
			extracted = fs.readFileSync('program.json', 'utf8');
			if (extracted.length > 0) {
				extracted = JSON.parse(extracted);
				array = extracted;
			}
		} catch (error) {}

		return array;
	};

	const uid = $AUTH.currentUser.providerData[0].uid;

	onValue(ref($DB, `users/${uid}/command`), (snap) => {
		if (snap.exists()) {
			console.log(snap.val());
		}
	});
</script>

<div class="programs">
	{#each restored() as elem}
		<Program role={elem[0].toString()} program={elem[1]['program']} path={elem[1]['path']} />
	{/each}
</div>

<style>
	.programs {
		display: grid;
		grid-template-columns: repeat(2, 1fr) 2fr 1fr;
		gap: 1em;
		align-items: center;
		justify-items: center;
	}
</style>
