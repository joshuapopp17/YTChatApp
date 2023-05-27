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
    apiKey: "xxxx",
    authDomain: "xxxx",
    projectId: "xxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx",
    appId: "xxxx"
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
