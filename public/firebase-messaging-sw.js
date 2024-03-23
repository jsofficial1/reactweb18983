importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBC9AN4xyklS3WQIKHuZU68IL_jhZKPStg",
  authDomain: "just-superr-app.firebaseapp.com",
  projectId: "just-superr-app",
  storageBucket: "just-superr-app.appspot.com",
  messagingSenderId: "15127262298",
  appId: "1:15127262298:web:3e6312e5ede49a83d21463",
  measurementId: "G-PG2BG3DJ2P"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
