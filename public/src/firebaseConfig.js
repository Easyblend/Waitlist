import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth,signInAnonymously } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore,collection, addDoc ,setDoc,doc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgIVLE7VOywZihtw4RXpa1UKyzCQS1-jc",
  authDomain: "sell-it-out.firebaseapp.com",
  projectId: "sell-it-out",
  storageBucket: "sell-it-out.appspot.com",
  messagingSenderId: "254417730120",
  appId: "1:254417730120:web:465548040331ae9633367d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app) 
const dataBase = getFirestore(app)

//Code begins here

const email = document.querySelector("#email")
const form = document.querySelector("#signup-form")

let userID = ""

window.addEventListener("load",()=>{
    signInAnonymously(auth).then((user)=>{console.log(user.user.uid); userID = user.user.uid  }).catch((error)=>console.log(error))
})

const key="839ea37f2fmsh798b9b58e610d05p1de960jsn98c1f5d0d4d9"

form.addEventListener("submit", (e)=>{
e.preventDefault()
    if(email.value){
       setDoc(doc(dataBase, `Waitlist Users/${email.value}`),{
        ID:userID, 
        email:email.value
       }).then(()=>{
        const messageBody = `Dear ${email.value},

        Thank you for signing up for the waitlist for Flexicoins, the innovative web app that allows you to purchase currencies and earn interest as they rise. We're thrilled to have you on board and look forward to launching our platform to you!
          
        As a token of our appreciation for your early support, we would like to offer you an exclusive opportunity to earn $5 on our launch day. Every member of our waitlist will automatically receive $5 in their account when we launch, so please invite your friends and family to join us too.
        
        Our development team is working diligently to put the finishing touches on the app and ensure a smooth launch. We'll keep you updated on our progress and let you know as soon as we're ready to go live. In the meantime, please take some time to explore our website and learn more about our exciting new platform.
          
        If you have any questions or concerns, please don't hesitate to reach out to us. Our team is always happy to assist you.
          
        Thank you again for your interest in Flexicoin. We can't wait to serve you!
        Share this opportunity with Friends
          
        Best regards,
        
        Flexicoins Team
          `;
        
          const options = {
            method: 'POST',
            url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': key,
              'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email: email.value }],
                  subject: "Welcome to Flexicoin!",
                },
              ],
              from: { email: "support@flexicoins.com" },
              content: [{ type: "text/plain", value: messageBody}],
            }),
          };
        
          fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", options)
          .then(() => {})
          .catch((e) => {console.log(e)});
      
       }).catch((error)=>{
        console.log(error);
       })
    }
})
