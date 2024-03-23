import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBC9AN4xyklS3WQIKHuZU68IL_jhZKPStg",
  authDomain: "just-superr-app.firebaseapp.com",
  projectId: "just-superr-app",
  storageBucket: "just-superr-app.appspot.com",
  messagingSenderId: "15127262298",
  appId: "1:15127262298:web:3e6312e5ede49a83d21463",
  measurementId: "G-PG2BG3DJ2P"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BOJfEzP0IQc065OpXOOFrgouj2pNWPlLD96QcYPjBgDw7_Yqd6GuZUMhpMu62Hx2s5sfv-qQRUBLmbtRVVG0zIM",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
