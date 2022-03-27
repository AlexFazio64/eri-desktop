<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { CREDENTIALS, AUTH, ID, DB } from '../stores/global';
	import { beforeUpdate } from 'svelte';
	import { get, onValue, ref, set } from 'firebase/database';
	import { onMount } from 'svelte';
	import { v4 } from '@lukeed/uuid';

	const path: string = 'users/' + $ID + '/device/name';
	let device: string;
	let current_device: boolean = true;

	onMount(() => {
		try {
			const fs = require('fs');
			device = fs.readFileSync('id.txt', 'utf8');
			if (device.length == 0) {
				throw new Error('');
			} else {
				get(ref($DB, path)).then((snap) => {
					current_device = snap.exists() && snap.val() == device;
				});
			}
		} catch (error) {
			device = v4();
		}
	});

	onValue(ref($DB, path), (data) => {
		if (device == data.val()) current_device = true;
		else current_device = false;
	});

	const register_new_device = () => {
		set(ref($DB, path), device);
		const fs = require('fs');
		fs.writeFileSync('id.txt', device);
	};

	const logout = () => {
		signOut($AUTH).then(() => {
			ID.set(undefined);
			CREDENTIALS.set(undefined);
			goto('/');
		});
	};

	let picture: string;
	let username: string;

	beforeUpdate(() => {
		picture = $CREDENTIALS.photoURL;
		username = $CREDENTIALS.displayName;
	});
</script>

<div id="profile">
	<img src={picture} alt="profile" referrerpolicy="no-referrer" />
	<div class="status">
		<p class="user">{username}</p>
		{#if current_device}
			<span class="material-icons online">link</span>
			<span class="notify">online</span>
		{:else}
			<span class="material-icons offline">link_off</span>unlinked
		{/if}
	</div>
	<div class="status">
		<p>{device}</p>
		{#if !current_device}
			<span class="material-icons star-device" on:click={register_new_device}
				>important_devices</span
			>
		{/if}
	</div>
	<button on:click={logout}>Logout <span class="material-icons">logout</span></button>
</div>

<style>
	.user {
		font-size: 1.7em;
		margin: 0;
	}

	button > span {
		font-size: 1em;
	}

	.online {
		color: green;
	}

	.offline {
		color: orange;
	}

	.notify {
		animation: disappear 1s ease forwards;
		animation-delay: 1s;
	}

	@keyframes disappear {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	#profile {
		width: 100%;
		box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 50%);
		display: grid;
		grid-template-columns: 1fr 3fr;
		padding: 1em 0;
		align-items: center;
		justify-items: start;
		gap: 1em;
		border-radius: 1em;
	}

	img {
		align-self: center;
		justify-self: center;
		border-radius: 3em;
		grid-row: 1 / span 2;
	}

	button {
		display: flex;
		gap: 0.5em;
		grid-column: 1 / span 2;
		width: fit-content;
		align-self: center;
		justify-self: center;
		padding: 0.4em 1em;
		background-color: hsl(0, 100%, 40%);
		color: white;
		border: none;
		border-radius: 1em;
		font-size: 1em;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	button:hover {
		background-color: hsl(0, 100%, 50%);
	}

	.status {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	.star-device {
		background-color: hsl(263, 64%, 50%);
		padding: 0.2em 1em;
		cursor: pointer;
		color: white;
		border-radius: 4em;
		animation: blink 0.75s ease-in-out infinite;
	}

	@keyframes blink {
		0% {
			background-color: hsl(263, 64%, 50%);
		}
		50% {
			background-color: hsl(263, 64%, 60%);
		}
	}
</style>
