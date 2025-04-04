import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();

function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Get UID after successful login
            const user = userCredential.user;
            console.log("User signed in. UID:", user.uid);
        })
        .catch((error) => {
            console.error("Error signing in:", error.message);
        });
}