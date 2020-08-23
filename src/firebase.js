import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDB4oSuvqaIHjuW0fIMqH73YocVFi3xniY",
  authDomain: "snipbase-20b3e.firebaseapp.com",
  databaseURL: "https://snipbase-20b3e.firebaseio.com",
  projectId: "snipbase-20b3e",
  storageBucket: "snipbase-20b3e.appspot.com",
  messagingSenderId: "607227159713",
  appId: "1:607227159713:web:8fc757990e257177fd3ce0",
  measurementId: "G-5KLD4JJBX1",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

//Storage References
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
//Upload Paths
const profilePhoto = "Users/Profile_Photo/";

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  storage,
  storageRef,
  profilePhoto,
};
