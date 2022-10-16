import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

//here create a authentication getAuth pass by app
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  //google authennication googleProvider here
  const googleProvider = new GoogleAuthProvider();

  //github authennication 'new GithubAuthProvider' here
  const githubProvider = new GithubAuthProvider();

  //onclick event handler by 'google sign In' button
  const googleSignHandler = ()=> {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      setUser(user);
      console.log(user);
    }).catch( error => {
      console.error('error: ', error);
    })
  }

  //'sign in github' button with onClick event handler
  const signGithubHandler = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    }).catch( error => {
      console.error('error: ',error);
    })
  }

  //sign out onClick event handler by 'sign out' button
  const signOutHandler = ()=> {
    signOut(auth)
    .then(() => {
      setUser({})
    }).catch( ()=> {
      setUser({})
    })
  }
  return (
    <div className="App">
      {user.uid ?
        <button onClick={signOutHandler}>Sign Out</button>
        :
        <>
          <button onClick={googleSignHandler}>Google Sign In</button>
          <br />
          <button onClick={signGithubHandler}>Sign In Github</button>
        </>
      }
      {user.uid && 
        <div>
        <img src={user.photoURL} alt="" />
        <h3>User Name: {user.displayName}</h3>
        <p>User-Email: {user.email}</p>
      </div>}
    </div>
  );
}

export default App;
