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
			program = path.match(/((\w+\s*)+).exe$/i)[1];
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
								// console.log('stdout: ' + stdout);
								exec(`"${stdout}"`);
							}
						);
					} else {
						exec(`"${path}"`);
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

<p>{program}</p>
<p class="category">{role}</p>

<form on:submit|preventDefault={update_store}>
	<input type="text" readonly bind:value={path} on:blur={update_store} />
</form>

<div
	class="exe-drop-point"
	title="drop the executable or link here"
	on:click={run}
	on:dragover|stopPropagation|preventDefault={(e) => {}}
	on:drop|preventDefault|stopPropagation={(e) => {
		path = e.dataTransfer.files[0].path;

		const { exec } = require('node:child_process');

		if (path.match(/.lnk$/)) {
			exec('type "' + path + '" | find "\\" | findstr /b "[a-z]:[\\\\]"', (e, o, serr) => {
				if (e) throw { err: e, stderr: serr };
				path = o;
				path = path.replace(/[\r\n]+$/g, '');
				update_store();
			});
		} else {
			update_store();
		}
	}}
>
	<span class="material-icons">create_new_folder</span>
</div>

<style>
	.category {
		font-size: 0.8em;
		color: rgb(110, 110, 110);
		text-decoration: underline;
	}

	input[type='text'] {
		outline: none;
		border: none;
		border-bottom: 1px solid black;
	}

	div.exe-drop-point {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
		width: 50px;
		border-radius: 4em;
		border: black 1px solid;
	}

	span {
		text-align: center;
	}

	p {
		justify-self: baseline;
	}
</style>
