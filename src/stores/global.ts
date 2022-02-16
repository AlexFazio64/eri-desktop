import { writable } from 'svelte/store';
import type { Auth, User } from 'firebase/auth';
import type { Database } from 'firebase/database';

export const DB = writable<Database>();
export const AUTH = writable<Auth>();
export const CREDENTIALS = writable<User>();
export const ID = writable<string>();

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDT8ZVGhNpfpngnnPB4UMcJB9s76GvpWFA',
	authDomain: 'eri-computer-assistant.firebaseapp.com',
	databaseURL: 'https://eri-computer-assistant-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'eri-computer-assistant',
	storageBucket: 'eri-computer-assistant.appspot.com',
	messagingSenderId: '160025218403',
	appId: '1:160025218403:web:73c3f2d3fc6c6bad995756',
	serviceAccountID: 'firebase-adminsdk-ggxqa@eri-dev.iam.gserviceaccount.com',
	measurementId: 'G-2SDNWGVEDV'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
DB.set(database);
AUTH.set(auth);
