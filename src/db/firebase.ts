import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export interface IFirestoreEnvs {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const db = (envs: IFirestoreEnvs) => getFirestore(initializeApp(envs))