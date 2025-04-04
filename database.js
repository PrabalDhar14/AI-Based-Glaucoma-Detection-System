// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "detect-glaucoma.firebaseapp.com",
    databaseURL: "https://detect-glaucoma-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "detect-glaucoma",
    storageBucket: "detect-glaucoma.appspot.com",
    messagingSenderId: "646903147925",
    appId: "1:646903147925:web:967e2e9d9410c09617da9c",
    measurementId: "G-N72X0WMP3D",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

//
// ----------------------🔥 AUTHENTICATION FUNCTIONS ----------------------
//

// ✅ User Registration - Sign Up
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User created successfully:", userCredential.user);
            alert("User registered successfully!");
        })
        .catch((error) => {
            console.error("Registration Error:", error.message);
            alert(error.message);
        });
}

// ✅ User Sign-In - Login
function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Signed in:", userCredential.user);
            alert("Signed in successfully!");
        })
        .catch((error) => {
            console.error("Sign-in Error:", error.message);
            alert(error.message);
        });
}

//
// ----------------------🖼️ IMAGE UPLOAD & SAVE FUNCTIONS ----------------------
//

// ✅ Upload Image to Firebase Storage
async function uploadImage() {
    const fileInput = document.getElementById("imageInput").files[0];
    if (!fileInput) {
        alert("Please select an image!");
        return;
    }

    const imgRef = storageRef(storage, "images/" + fileInput.name);

    // Uploading the image
    await uploadBytes(imgRef, fileInput);

    // Getting the download URL
    const downloadURL = await getDownloadURL(imgRef);
    console.log("Image uploaded successfully:", downloadURL);

    // Save data to Firebase Database
    saveData("user_001", downloadURL, "Pending Analysis");
}

// ✅ Save Image and Result to Firebase Database
function saveData(userId, imageUrl, result) {
    set(ref(database, "users/" + userId), {
        image: imageUrl,
        diagnosis: result,
        timestamp: new Date().toISOString(),
    });
    alert("Data saved successfully!");
}

// ✅ Export Functions for HTML
export { uploadImage, saveData, signInUser, registerUser };