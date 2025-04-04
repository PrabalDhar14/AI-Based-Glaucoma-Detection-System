// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnEBOdDrdP9hi9LNECQPgjBus5IYS-Xf8",
    authDomain: "detect-glaucoma.firebaseapp.com",
    databaseURL: "https://detect-glaucoma-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "detect-glaucoma",
    storageBucket: "detect-glaucoma.appspot.com",
    messagingSenderId: "646903147925",
    appId: "1:646903147925:web:967e2e9d9410c09617da9c",
    measurementId: "G-N72X0WMP3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// ✅ Function to Register User
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Get UID after successful registration
            const user = userCredential.user;
            console.log("User created successfully. UID:", user.uid);

            // Save user data to the database
            saveUserData(user.uid, email);
        })
        .catch((error) => {
            console.error("Error creating user:", error.message);
        });
}

// ✅ Function to Save User Data in Firebase Realtime Database
function saveUserData(uid, email) {
    set(ref(database, 'users/' + uid), {
            email: email,
            registrationDate: new Date().toISOString()
        })
        .then(() => {
            console.log("User data saved successfully.");
        })
        .catch((error) => {
            console.error("Error saving user data:", error.message);
        });
}