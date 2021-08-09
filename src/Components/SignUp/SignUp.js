import React, { useContext, useState } from 'react';
import './SignUp.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation, Link } from 'react-router-dom';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const SingUp = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser);
    const [oldUser, setOldUser] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        errorToDo: '',
    }) 
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/search" } };

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordHasLength = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = passwordHasLength && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log('User Name updated')
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleSubmit = (e) => {
        
        e.preventDefault()
        if (oldUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const updateUserInfo = { ...user }
                    updateUserInfo.name = 'Mithun Biswas'; 
                    setLoggedInUser(updateUserInfo)
                    setUser(updateUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const updateUserInfo = { ...user }
                    updateUserInfo.error = errorMessage;
                    updateUserInfo.errorToDo = 'Please login or create an account by another email.';
                    setUser(updateUserInfo);
                });
        }
        if (!oldUser && user.email && user.password) {
            console.log(user.email, user.password)
            firebase.auth().signInWithEmailAndPassword(user.email, user.password) 
                .then(res => {
                    const { email } = res.user;
                    const signedInUser = { email };
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        }
    }

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result?.user;
                const signedInUser = { displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const facebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div>
            <input type="checkbox" className='check-area' name="signUp" id="" onChange={() => setOldUser(!oldUser)} />
            <label htmlFor="signUp">For New User</label>
            <form className="sign-up" onSubmit={handleSubmit}>
                {oldUser ? <h1>Create An Account</h1> : <h1>Login</h1> }
                {oldUser && <p className="name-area">
                                <label htmlFor="">Your Name</label>
                                <input className="form-control" type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />
                            </p>
                }
                <br />
                <br />
                <label htmlFor="">Your Email </label>
                <input className="form-control" type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
                <br />
                <br />
                <label htmlFor="">Password  </label>
                <input className="form-control" type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <br />
                <input className="submit-control" type="submit" value={oldUser ? "Sign up" : "Sign in"} />
            </form>
            <div className="signIn-area">
                <button className="signIn-btn ggl-btn" onClick={googleSignIn}>Continue with Google</button>
                <br />
                <button className="signIn-btn" onClick={facebookSignIn}>Continue with Facebook</button>
            </div>
        </div>
    );
};

export default SingUp;