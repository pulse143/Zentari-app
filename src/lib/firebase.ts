import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const storage = getStorage(app);

const isMock = firebaseConfig.apiKey === "mock-api-key";

// Mock Data
const MOCK_POI_RECORDS = [
  {
    id: 'poi_mock_1',
    evidence_id: 'ev_mock_1',
    user_id: 'mock_user',
    poi_score: 88.4,
    verification_data: {
      authenticity_score: 0.95,
      context_match_score: 0.92,
      detected_objects: ['sapling', 'forest', 'soil'],
      risk_assessment: { level: 'low', flags: [] },
      reasoning: 'High-resolution satellite imagery confirms reforestation activity.'
    },
    block_number: 2849102,
    timestamp: { toDate: () => new Date() },
    metadata: 'Reforestation verification in Amazon Basin.'
  },
  {
    id: 'poi_mock_2',
    evidence_id: 'ev_mock_2',
    user_id: 'mock_user',
    poi_score: 92.1,
    verification_data: {
      authenticity_score: 0.98,
      context_match_score: 0.95,
      detected_objects: ['solar_panel', 'energy_grid'],
      risk_assessment: { level: 'low', flags: [] },
      reasoning: 'IoT sensor data matches reported energy production.'
    },
    block_number: 2849105,
    timestamp: { toDate: () => new Date(Date.now() - 3600000) },
    metadata: 'Solar energy production audit in Sahara.'
  }
];

// Firestore functions
export const collection = (database: any, path: string) => {
  return firestore.collection(database, path);
};

export const doc = (database: any, path: string, ...pathSegments: string[]) => {
  return firestore.doc(database, path, ...pathSegments);
};

export const getDoc = async (docRef: any) => {
  if (isMock) {
    if (docRef.path.startsWith('users/')) {
      return {
        exists: () => true,
        data: () => ({
          displayName: 'Demo User',
          email: 'demo@zentari.io',
          photoURL: 'https://picsum.photos/seed/demo/200/200',
          role: 'node',
          trust_score: 75,
          createdAt: new Date().toISOString()
        })
      };
    }
    return { exists: () => false, data: () => null };
  }
  return firestore.getDoc(docRef);
};

export const setDoc = async (docRef: any, data: any) => {
  if (isMock) return Promise.resolve();
  return firestore.setDoc(docRef, data);
};

export const addDoc = async (colRef: any, data: any) => {
  if (isMock) return Promise.resolve({ id: 'mock_id' });
  return firestore.addDoc(colRef, data);
};

export const query = (colRef: any, ...queryConstraints: any[]) => {
  return firestore.query(colRef, ...queryConstraints);
};

export const onSnapshot = (queryOrRef: any, onNext: any, onError?: any) => {
  if (isMock) {
    const path = queryOrRef.path || (queryOrRef._query && queryOrRef._query.path.segments.join('/'));
    if (path === 'poi_records') {
      onNext({
        docs: MOCK_POI_RECORDS.map(record => ({
          id: record.id,
          data: () => record
        }))
      });
      return () => {};
    }
    onNext({ docs: [] });
    return () => {};
  }
  return firestore.onSnapshot(queryOrRef, onNext, onError);
};

export const orderBy = (fieldPath: string, directionStr?: any) => 
  firestore.orderBy(fieldPath, directionStr);

export const limit = (n: number) => 
  firestore.limit(n);

export const where = (fieldPath: string, opStr: any, value: any) => 
  firestore.where(fieldPath, opStr, value);

export const serverTimestamp = () => firestore.serverTimestamp();

export const getDocFromServer = async (docRef: any) => {
  if (isMock) return getDoc(docRef);
  return firestore.getDocFromServer(docRef);
};

export { db, auth, storage, ref, uploadBytes, getDownloadURL };
export const googleProvider = new GoogleAuthProvider();

export const signInWithPopup = async (auth: any, provider: any) => {
  if (isMock) {
    return {
      user: {
        uid: 'mock_user_id',
        displayName: 'Demo User',
        email: 'demo@zentari.io',
        photoURL: 'https://picsum.photos/seed/demo/200/200',
        getIdToken: () => Promise.resolve('mock_token')
      }
    };
  }
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
