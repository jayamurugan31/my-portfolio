// ...existing code...

// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa2z7yV-PxazTqgIceseqpQER40Y8razs",
  authDomain: "portfolio-65f55.firebaseapp.com",
  projectId: "portfolio-65f55",
  storageBucket: "portfolio-65f55.firebasestorage.app",
  messagingSenderId: "216970086067",
  appId: "1:216970086067:web:b1c5fe8d3da36d5d0f12c6",
  measurementId: "G-TY414VV06Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function sendMail() {
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // Save to Firestore
    addDoc(collection(db, "contacts"), parms)
        .then(() => {
            console.log("Contact saved to Firestore");
        })
        .catch((error) => {
            console.error("Error saving contact to Firestore: ", error);
        });

    emailjs.send("service_q2f7v93", "template_o9bjqa6", parms)
        .then(function (response) {
            alert("Email Sent Successfully!");
            console.log("SUCCESS!", response.status, response.text);
        })
        .catch(function (error) {
            alert("Failed to send email. Please try again.");
            console.error("FAILED...", error);
        });

    return false; // Prevents page refresh
}
// ...existing code...