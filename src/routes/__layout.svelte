<script>
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { CREDENTIALS, AUTH } from '../stores/global';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($CREDENTIALS == undefined) {
			onAuthStateChanged($AUTH, (user) => {
				if (user) {
					CREDENTIALS.set({ user });
					console.log(`cred from layout: ${user.providerData[0].uid}`);
				} else {
					goto('/');
				}
			});
		}
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- components -->

<slot />

<style>
</style>
