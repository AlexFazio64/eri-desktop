<script>
	import '../app.css';
	import { browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
	import { CREDENTIALS, AUTH, ID } from '../stores/global';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	//Ciao bro tvb
	onMount(() => {
		$AUTH.setPersistence(browserLocalPersistence);
		onAuthStateChanged($AUTH, (user) => {
			if (user) {
				ID.set(user.providerData[0].uid);
				CREDENTIALS.set($AUTH.currentUser);
				console.log(`cred from layout: ${$ID}`);
			} else {
				goto('/');
			}
		});
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- components -->

<slot />

<style>
</style>
