import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import Login from './screens/Login';
import Chat from './screens/Chat';
import { useState } from 'react';
import { getFirestore } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null)
  
  // ADD THE FIREBASE INFO HERE TO TEST THE APP 
  const firebaseConfig = {
    apiKey: "AIzaSyDPNd3_CWNcZKFF2Krrub1KTi1Ed8IrYiQ",
    authDomain: "chatapp-e272b.firebaseapp.com",
    projectId: "chatapp-e272b",
    storageBucket: "chatapp-e272b.appspot.com",
    messagingSenderId: "276064633381",
    appId: "1:276064633381:web:acd4a1d1b97ecaf9a9b5cc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log("changed")
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  });

  return (
    <div className="App">
      {user ? <Chat></Chat> : <Login></Login>}
    </div>
  );
}

export default App;
