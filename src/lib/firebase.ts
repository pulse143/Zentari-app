import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
// LIVE DATA: This configuration is provisioned via AI Studio
const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const storage = getStorage(app);

// Firestore functions
// LIVE DATA: Standard Firestore operations
export const collection = (database: any, path: string) => {
  return firestore.collection(database, path);
};

export const doc = (database: any, path: string, ...pathSegments: string[]) => {
  return firestore.doc(database, path, ...pathSegments);
};

export const getDoc = async (docRef: any) => {
  return firestore.getDoc(docRef);
};

export const setDoc = async (docRef: any, data: any) => {
  return firestore.setDoc(docRef, data);
};

export const addDoc = async (colRef: any, data: any) => {
  return firestore.addDoc(colRef, data);
};

export const query = (colRef: any, ...queryConstraints: any[]) => {
  return firestore.query(colRef, ...queryConstraints);
};

export const onSnapshot = (queryOrRef: any, onNext: any, onError?: any) => {
  return firestore.onSnapshot(queryOrRef, onNext, onError);
};

export const orderBy = (fieldPath: string, directionStr?: any) => 
  firestore.orderBy(fieldPath, directionStr);

export const limit = (n: number) => 
  firestore.limit(n);

export const where = (fieldPath: string, opStr: any, value: any) => 
  firestore.where(fieldPath, opStr, value);

export const updateDoc = async (docRef: any, data: any) => 
  firestore.updateDoc(docRef, data);

export const increment = (n: number) => 
  firestore.increment(n);

export const serverTimestamp = () => firestore.serverTimestamp();

export const getDocFromServer = async (docRef: any) => {
  return firestore.getDocFromServer(docRef);
};

export { db, auth, storage, ref, uploadBytes, getDownloadURL };
export const googleProvider = new GoogleAuthProvider();

export const signInWithPopup = async (auth: any, provider: any) => {
  return firebaseSignInWithPopup(auth, provider);
};

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => auth.signOut();

// Firestore Helpers with Error Handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection Test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();

export { onAuthStateChanged, type FirebaseUser };
