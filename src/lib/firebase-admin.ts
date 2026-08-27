import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type FirestoreLike = {
  collection: (name: string) => {
    add: (data: Record<string, unknown>) => Promise<unknown>;
  };
};

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const normalizedPrivateKey = privateKey ?? "";

const isFirebaseAdminConfigured =
  Boolean(projectId) &&
  Boolean(clientEmail) &&
  Boolean(normalizedPrivateKey) &&
  normalizedPrivateKey !== "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n" &&
  !normalizedPrivateKey.includes("...");

const fallbackDb: FirestoreLike = {
  collection: () => ({
    add: async () => {
      throw new Error(
        "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local."
      );
    },
  }),
};

let db: FirestoreLike = fallbackDb;

if (isFirebaseAdminConfigured) {
  const serviceAccount = {
    projectId,
    clientEmail,
    privateKey: normalizedPrivateKey,
  };

  const app =
    getApps().length === 0
      ? initializeApp({
          credential: cert(serviceAccount),
        })
      : getApps()[0];

  db = getFirestore(app) as FirestoreLike;
}

export { db, isFirebaseAdminConfigured };
