<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { CREDENTIALS, AUTH } from '../stores/global';

	const logout = () => {
		signOut($AUTH).then(() => goto('./'));
	};

	const picture = $CREDENTIALS.user.photoURL;
	const username = $CREDENTIALS.user.displayName;
	const uid = $CREDENTIALS.user.uid;
</script>

<div id="profile">
	<img src={picture} alt="profile" />
	<p class="user">{username}</p>
	<p>{uid}</p>
	<button on:click={logout}>Logout</button>
</div>

<style>
	.user {
		font-size: 1.7em;
		margin: 0;
	}

	#profile {
		box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 50%);
		display: grid;
		grid-template-columns: 1fr 3fr;
		padding: 1em;
		align-items: center;
		justify-items: start;
		gap: 1em;
	}

	img {
		align-self: center;
		justify-self: center;
		border-radius: 3em;
		grid-row: 1 / span 2;
	}

	button {
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
</style>
