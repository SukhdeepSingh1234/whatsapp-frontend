import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC_NSUKi2V3Gop5A3MyBfti5WwpPPf_ZBc",
  authDomain: "whatsapp-mern-3546a.firebaseapp.com",
  projectId: "whatsapp-mern-3546a",
  storageBucket: "whatsapp-mern-3546a.appspot.com",
  messagingSenderId: "951160690713",
  appId: "1:951160690713:web:65772305e5244f20a8f288",
  measurementId: "G-G19EJXMPH4"
};

const firebaseApp=initializeApp(firebaseConfig);

export const storage=getStorage(firebaseApp)


