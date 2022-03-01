<script lang="ts">
	import { EXE_PATH } from '../stores/global';
	export let program: string, role: string, path: string;

	const update_store = () => {
		if (path.length == 0) {
			EXE_PATH.update((old) => {
				old.delete(role);
				return old;
			});
		} else {
			EXE_PATH.update((old) => {
				old.set(role, { program, path });
				return old;
			});
		}
	};

	const run = () => {
		try {
			const fs = require('fs');
			fs.readFile('program.json', 'utf8', (err, data) => {
				if (err == null) {
					const restored = new Map(JSON.parse(data));
					console.log(restored);
					let val = restored.get(role);

					console.log('launching: ' + val['path']);
					const { exec } = require('node:child_process');

					const filepath = val['path'];

					if (filepath.match(/.lnk$/)) {
						exec(
							'type "' + val['path'] + '" | find "\\" | findstr /b "[a-z]:[\\\\]"',
							(err, stdout, stderr) => {
								if (err) {
									console.log(err);
								}
								console.log('stdout: ' + stdout);
								exec('"' + stdout + '"');
							}
						);
					} else {
						exec('"' + path + '"');
					}
				} else {
					console.log(err);
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<p>{role}</p>
<p>{program}</p>
<form on:submit|preventDefault={update_store}>
	<input type="text" bind:value={path} on:blur={update_store} />
</form>

<div
	class="exe-drop-point"
	on:click={run}
	on:dragover|stopPropagation|preventDefault={(e) => {}}
	on:drop|preventDefault|stopPropagation={(e) => {
		for (const f of e.dataTransfer.files) {
			console.log(f.path);
		}
		path = e.dataTransfer.files[0].path;
		update_store();
	}}
>
	<span>drop here</span>
</div>

<style>
	div.exe-drop-point {
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
		width: 50px;
		border: solid 1px rgb(56, 56, 56);
	}
	span {
		text-align: center;
	}
	p {
		justify-self: baseline;
	}
</style>
