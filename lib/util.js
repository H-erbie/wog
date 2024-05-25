import { PushSubscription } from "web-push";
import { auth, db } from "@/firebase/config";

import { setDoc, doc } from "firebase/firestore";


export const saveSubscriptionToDb = async (subscription) => {
//  const user = auth.currentUser;
//  const subscriptionData = {
//   endpoint:subscription.endpint,
//   keys: subscription.keys
//  }
//  const newSubs = JSON.stringify(subscriptionData)
    if (subscription.user) {

      await setDoc(doc(db, "subscriptions", subscription.user.uid), {
        subscription:subscription.subscription,
        // userId: uid,
      });
    }
    console.log(subscription)
};

// export const getSubscriptionsFromDb = () => {
  
//   return Promise.resolve(dummyDb.subscriptions);
// };
