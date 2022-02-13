import { writable } from 'svelte/store';
import type { Auth, UserCredential } from "firebase/auth";
import type { Database } from "firebase/database"

export const DB = writable<Database>();
export const AUTH = writable<Auth>();
export const CREDENTIALS = writable<UserCredential>();