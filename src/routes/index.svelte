<!-- <script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api');

		if (res.ok) return { props: { users: await res.json() } };
		return {
			status: res.status,
			error: new Error()
		};
	}
</script> -->
<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { AUTH, CREDENTIALS, DB } from '../stores/global';
	import {
		signInWithPopup,
		onAuthStateChanged,
		getAuth,
		GoogleAuthProvider,
	} from 'firebase/auth';
	import { getDatabase } from 'firebase/database';
	import { goto } from '$app/navigation';

	const firebaseConfig = {
		apiKey: 'AIzaSyDT8ZVGhNpfpngnnPB4UMcJB9s76GvpWFA',
		authDomain: 'eri-computer-assistant.firebaseapp.com',
		databaseURL: 'https://eri-computer-assistant-default-rtdb.europe-west1.firebasedatabase.app',
		projectId: 'eri-computer-assistant',
		storageBucket: 'eri-computer-assistant.appspot.com',
		messagingSenderId: '160025218403',
		appId: '1:160025218403:web:73c3f2d3fc6c6bad995756',
		measurementId: 'G-2SDNWGVEDV'
	};

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const database = getDatabase(app);
	DB.set(database);
	AUTH.set(auth);

	const login = () => {
		signInWithPopup(auth, new GoogleAuthProvider()).then((cred) => {
			CREDENTIALS.set(cred);
			goto('./authorized');
		});
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.providerData[0].uid;
			console.log(`Hello `, uid);
		} else {
			console.log('is anyone there?');
		}
	});
</script>

<main>
	<form on:submit|preventDefault={login}>
		<p class="title">Sign in with your Google Account</p>
		<div class="google-btn" on:click={login}>
			<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
				<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
					<path
						fill="#4285F4"
						d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
					/>
					<path
						fill="#34A853"
						d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
					/>
					<path
						fill="#FBBC05"
						d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
					/>
					<path
						fill="#EA4335"
						d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
					/>
				</g></svg
			>
			<p class="login">Login with Google</p>
		</div>
	</form>
</main>

<style>
	main {
		padding: 3em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		box-shadow: 0px 5px 20px 0px rgb(50 50 50 / 70%);
		/* border: black 1px solid; */
		padding: 1.2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	.title {
		font-family: 'Raleway';
		font-size: 1.6em;
		font-weight: 300;
	}

	.google-btn {
		display: flex;
		align-items: center;
		gap: 20px;
		border-radius: 5px;
		box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 50%);
		padding: 0px 20px;
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.google-btn:hover {
		box-shadow: 0px 1px 4px 2px rgb(66 133 244 / 70%);
	}

	.google-btn > p {
		font-weight: 200;
		font-size: 1.2em;
		margin: 0.5em 0.2em;
	}
</style>
