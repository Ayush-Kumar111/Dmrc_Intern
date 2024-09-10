
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCe5KF-5pPZEjbTYoIVjH_TaEj3oA40fYY",
  authDomain: "login-9f318.firebaseapp.com",
  databaseURL: "https://login-9f318-default-rtdb.firebaseio.com",
  projectId: "login-9f318",
  storageBucket: "login-9f318.appspot.com",
  messagingSenderId: "684837671770",
  appId: "1:684837671770:web:e194a51af63729c4459963",
  measurementId: "G-HR4NKBQXYZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let signinButton = document.getElementById("signin-button");
let signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", (e) => {
  console.log("signup click 1");
  let name = document.getElementById("name").value;
  let nohp = document.getElementById("nohp").value;
  let emailSignup = document.getElementById("email_signup").value;
  let passwordSignup = document.getElementById("psw_signup").value;
  console.log("signup click");
  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup
      })
        .then(() => {
          
          alert("user's data saved successfully!!!");
        })
        .catch((error) => {
          
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      alert(errorMessage);
    });
});

signinButton.addEventListener("click", (e) => {
  console.log("signin click 1");
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;
  console.log("signin click");
  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      
      const user = userCredential.user;
      let lgDate = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate
      })
        .then(() => {
          
          location.href = "dmrccode/index.html";
        })
        .catch((error) => {
          
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
});
