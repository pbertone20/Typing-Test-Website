import { auth } from "./firebaseConfig.js";
import { signInUserWithGoogle } from "./utilities/authentication/SignInWithGoogle.js";

// Listener triggers every time there is a change in the users sign-in state
auth.onAuthStateChanged(function (user) {

    // if the user is signed in 
    if (user) {
        console.log("User is logged in:", user.displayName);

        // Redirect the user to index.html page 
        window.location.href = "index.html";

        // if the user is signed out
    } else {
        console.log("User is not logged in");

        // Redirect the user to log-in.html page 
        //window.location.href = "log-in.html";
    }
});

// Function calls signInUserWithGoogle and error checks to see if user has successfully signed in  
async function handleGoogleSignUp() {

    //calls function signInUserWithGoogle and receives a response 
    const response = await signInUserWithGoogle();

    // if an error occurs duing the sign-in process
    if (response === "error") {
        console.log("Error, user not signed in with Google");
        // if the user has successfully signed in
    } else {
        console.log("success, user has signed in with Google");
    }

};

document.getElementById("button").addEventListener("click", handleGoogleSignUp);