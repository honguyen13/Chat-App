import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyC1RzMSsogvOO56yVu5g9EHJYWdEV7C1Ck',
  authDomain: 'rnchatapp-4e731.firebaseapp.com',
  databaseURL:
    'https://rnchatapp-4e731-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rnchatapp-4e731',
  storageBucket: 'rnchatapp-4e731.appspot.com',
  messagingSenderId: '929312803749',
  appId: '1:929312803749:web:7405ffff616846773d364c',
  measurementId: 'G-SCNDYJT6K8',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth};
