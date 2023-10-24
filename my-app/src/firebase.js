import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBnOjc9jiFF2Doj_aBZ-Wie6wTdcSgrrPw",
    authDomain: "todo-resultschool.firebaseapp.com",
    projectId: "todo-resultschool",
    storageBucket: "todo-resultschool.appspot.com",
    messagingSenderId: "1010942184926",
    appId: "1:1010942184926:web:c3849cb79db70d8669214f",
    databaseURL: "https://todo-resultschool-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);