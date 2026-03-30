import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
let app, db: any, auth: any, storage: any;
const isMock = firebaseConfig.apiKey === "mock-api-key";

if (!isMock) {
  app = initializeApp(firebaseConfig);
  db = firestore.getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  console.warn("Firebase is running in MOCK mode. Set up real Firebase in Settings.");
  app = {};
  db = { 
    _isMock: true,
    collection: () => ({ 
      doc: () => ({ get: async () => ({ exists: () => false, data: () => null }), set: async () => {} }),
      where: () => ({ orderBy: () => ({ limit: () => ({ onSnapshot: (cb: any) => { cb({ docs: [] }); return () => {}; } }) }) })
    }) 
  };
  auth = { 
    currentUser: { uid: 'mock-uid', displayName: 'Mock User', email: 'mock@example.com', photoURL: null },
    onAuthStateChanged: (cb: any) => { 
      setTimeout(() => cb({ uid: 'mock-uid', displayName: 'Mock User', email: 'mock@example.com', photoURL: null, getIdToken: async () => "mock-token" }), 100); 
      return () => {}; 
    },
    signOut: async () => {} 
  };
  storage = {};
}

const MOCK_RECORDS = [
  {
    id: 'poi_mock_1',
    poi_score: 12.4,
    verification_data: {
      authenticity_score: 0.98,
      context_match_score: 0.95,
      detected_objects: ["Reforestation", "Saplings", "Climate"],
      risk_assessment: "low",
      reasoning: "Visual evidence matches satellite telemetry for Sector 4 reforestation efforts."
    },
    block_number: 2849102,
    timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 60) },
    metadata: "Verified 450 saplings in Sector 4"
  },
  {
    id: 'poi_mock_2',
    poi_score: 8.2,
    verification_data: {
      authenticity_score: 0.92,
      context_match_score: 0.88,
      detected_objects: ["Water Well", "Infrastructure"],
      risk_assessment: "low",
      reasoning: "Infrastructure verified via geo-tagged imagery and community reporting."
    },
    block_number: 2849105,
    timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 120) },
    metadata: "New well construction in Lusaka District 12"
  }
];

// Mock Firestore functions
export const collection = (database: any, path: string) => {
  if (isMock) return { _path: path, _isMock: true };
  return firestore.collection(database, path);
};

export const doc = (database: any, path: string, ...pathSegments: string[]) => {
  if (isMock) return { _path: path, _segments: pathSegments, _isMock: true };
  return firestore.doc(database, path, ...pathSegments);
};

export const getDoc = async (docRef: any) => {
  if (isMock) {
    if (docRef._path === 'users') return { exists: () => true, data: () => ({ uid: 'mock-uid', displayName: 'Mock User', trust_score: 85, role: 'node' }) };
    return { exists: () => false, data: () => null };
  }
  return firestore.getDoc(docRef);
};

export const setDoc = async (docRef: any, data: any) => {
  if (isMock) return;
  return firestore.setDoc(docRef, data);
};

export const addDoc = async (colRef: any, data: any) => {
  if (isMock) return { id: 'mock-id' };
  return firestore.addDoc(colRef, data);
};

export const query = (colRef: any, ...queryConstraints: any[]) => {
  if (isMock) return { _colRef: colRef, _constraints: queryConstraints, _isMock: true };
  return firestore.query(colRef, ...queryConstraints);
};

export const onSnapshot = (queryOrRef: any, onNext: any, onError?: any) => {
  if (isMock) {
    const path = queryOrRef._colRef?._path || queryOrRef._path;
    if (path === 'poi_records') {
      setTimeout(() => onNext({ docs: MOCK_RECORDS.map(r => ({ id: r.id, data: () => r })) }), 100);
    } else {
      setTimeout(() => onNext({ docs: [] }), 100);
    }
    return () => {};
  }
  return firestore.onSnapshot(queryOrRef, onNext, onError);
};

export const orderBy = (fieldPath: string, directionStr?: any) => 
  isMock ? { type: 'orderBy', fieldPath, directionStr } : firestore.orderBy(fieldPath, directionStr);

export const limit = (n: number) => 
  isMock ? { type: 'limit', n } : firestore.limit(n);

export const where = (fieldPath: string, opStr: any, value: any) => 
  isMock ? { type: 'where', fieldPath, opStr, value } : firestore.where(fieldPath, opStr, value);
export const serverTimestamp = () => isMock ? new Date() : firestore.serverTimestamp();
export const getDocFromServer = async (docRef: any) => {
  if (isMock) return { exists: () => false, data: () => null };
  return firestore.getDocFromServer(docRef);
};

export { db, auth, storage, isMock };
export const googleProvider = new GoogleAuthProvider();

export const signInWithPopup = async (auth: any, provider: any) => {
  if (isMock) {
    console.log("Mock sign in triggered");
    return { user: auth.currentUser };
  }
  return firebaseSignInWithPopup(auth, provider);
};

// Auth Helpers
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
  if (isMock) return;
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
