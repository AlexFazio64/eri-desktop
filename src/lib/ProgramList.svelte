<script lang="ts">
	import { onValue, ref, set } from 'firebase/database';
	import { DB, EXE_PATH, ID } from '../stores/global';
	import Program from './Program.svelte';

	const programs = new Map<string, {}>();

	try {
		const fs = require('fs');
		let extracted;
		extracted = fs.readFileSync('program.json', 'utf8');
		if (extracted.length > 0) {
			extracted = JSON.parse(extracted);
			EXE_PATH.set(new Map<string, {}>(extracted));
		}
	} catch (error) {}

	const restored = () => {
		programs.set('music', { path: '', program: '' });
		programs.set('communication', { path: '', program: '' });
		programs.set('editing', { path: '', program: '' });
		programs.set('term', { path: '', program: '' });
		programs.set('text_editor', { path: '', program: '' });
		programs.set('office', { path: '', program: '' });
		programs.set('game_launcher', { path: '', program: '' });
		programs.set('browser', { path: '', program: '' });

		const alias: Map<string, {}> = $EXE_PATH;

		for (const entry of programs.keys()) {
			if (!alias.has(entry)) alias.set(entry, { path: '', program: '' });
		}

		const array = Array.from($EXE_PATH);
		return array;
	};

	const run_program = ({ action, params }) => {
		const fs = require('fs');
		for (const p of params) {
			const val = $EXE_PATH.get(p);
			const { exec } = require('node:child_process');

			const filepath = val['path'];
			exec(
				`Start-Process -FilePath "${filepath}" -WindowStyle Maximized`,
				{ shell: 'powershell' },
				(e, o, se) => {
					console.log(e, o, se);
				}
			);
		}
	};

	const stop_program = ({ action, params }) => {
		const fs = require('fs');
		for (const p of params) {
			const val = $EXE_PATH.get(p);

			const { exec } = require('node:child_process');
			const process_name = val['program'];

			exec(`Stop-Process -Name "${process_name}"`, { shell: 'powershell' }, (e, o, se) => {
				console.log(e ? e : 'action performed');
			});
		}
	};

	const media_control = ({ action, params }) => {
		const { exec } = require('node:child_process');
		exec(`python .\\media_keys.py ${params}`, (e, o, se) => {
			console.log(e ? e : 'action performed');
		});
	};

	const custom_routine = ({ action, params }) => {
		const { exec } = require('node:child_process');
		exec(`python .\\user_scripts\\${params}.py`, (e, o, se) => {
			console.log(e ? e : 'action performed');
		});
	};

	onValue(ref($DB, `users/${$ID}/command`), (snap) => {
		if (snap.exists()) {
			switch (snap.val().action) {
				case 'Opening':
					run_program(snap.val());
					break;
				case 'Closing':
					stop_program(snap.val());
					break;
				case 'media':
					media_control(snap.val());
					break;
				case 'custom':
					custom_routine(snap.val());
					break;
			}
			set(ref($DB, `users/${$ID}/command`), null);
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
