// https://console.firebase.google.com/u/0/project/aylanisdope/database/aylanisdope/data
//  https://firebase.google.com/docs/database/web/structure-data?authuser=0

const firebaseConfig = {
  apiKey: "AIzaSyAGeRIKJK84hOAdX1IHUPDivm6xDz7e6LY",
  authDomain: "aylanisdope.firebaseapp.com",
  databaseURL: "https://aylanisdope.firebaseio.com",
  projectId: "aylanisdope",
  storageBucket: "aylanisdope.appspot.com",
  messagingSenderId: "753431802863",
  appId: "1:753431802863:web:a4fedd8c7e7da852"
};
export default async () => {
  const firebase = await import("firebase/app");
  await import("firebase/database");
  if (!firebase.apps.length) {
    //github.com/zeit/next.js/issues/1999
    // Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.database();
};
