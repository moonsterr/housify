import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('Server/.env') });

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://housefi-aa357.firebasestorage.app',
});

const bucket = admin.storage().bucket();
export default bucket;
