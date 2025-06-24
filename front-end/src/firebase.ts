import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDe8Jbt1lxmVLPHr65ZucM--qIFE4D_v_s",
  authDomain: "iot-testing-68711.firebaseapp.com",
  databaseURL: "https://iot-testing-68711-default-rtdb.firebaseio.com",
  projectId: "iot-testing-68711",
  storageBucket: "iot-testing-68711.appspot.com",
  messagingSenderId: "YOUR-ID",
  appId: "YOUR-APP-ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
