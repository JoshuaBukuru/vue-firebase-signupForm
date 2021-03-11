import firebase from "firebase";
import { ref, onUnmounted } from "vue"; //33.7K (gzipped: 13.2K)

const config = {
  apiKey: "AIzaSyD-nfuYATNJqKRj7NmIi1NXh6SJf9QG3Sc",
  authDomain: "vie-firebase-demo.firebaseapp.com",
  projectId: "vie-firebase-demo",
  storageBucket: "vie-firebase-demo.appspot.com",
  messagingSenderId: "227993569712",
  appId: "1:227993569712:web:6888f1cbafae6d234d6e75",
  measurementId: "G-RGM6EKQWMG",
};
const firebaseApp = firebase.initializeApp(config); //setup and initialise firbase configuration
const db = firebaseApp.firestore(); //grabs database we just created
const userCollection = db.collection("users");

/*
Author: Joshua Bukuru
*/
export const createUser = (user) => {
  //Adds a user to the users collection
  return userCollection.add(user);
};

export const getUser = async (id) => {
  //Get a user from firebase
  const user = await userCollection.doc(id).get();
  return user.exists ? user.data() : null;
};
export const updateUser = (id, user) => {
  return userCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  //Delete user
  //console.log("user " + id + "has been deleted");
  return userCollection
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted");
    })
    .catch((error) => {
      console.error("Error removing document ", error);
    });
};

export const useLoadUsers = () => {
  //adds an event listener to detect any cbanges that occur on the database
  const users = ref([]);
  userCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
