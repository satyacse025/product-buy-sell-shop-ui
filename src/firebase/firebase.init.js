// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6N6P82Ka865KLIHzwO--Nu-AeOaMw67s",
  authDomain: "product-buy-sell-shop.firebaseapp.com",
  projectId: "product-buy-sell-shop",
  storageBucket: "product-buy-sell-shop.appspot.com",
  messagingSenderId: "335176983309",
  appId: "1:335176983309:web:90cf85bb6951a93e42c644"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;