import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "../../firebaseConfig.js";

export async function storeUserData(uId, uEmail) {
    try {
        const userInfoCollection = collection(db, `user-${uId}`);
        const docUniqueId = generateUniqueId();


        const data = {
            time: getTimeStr(), 
            userId: uId,
            email: uEmail,
            docId: docUniqueId,
        };

        await setDoc(doc(userInfoCollection, docUniqueId), data);

    } catch (error) {
        console.error("Error storing data:", error);
        throw new Error("Failed to store user info");
    }
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}

function getTimeStr() {
    const sec = new Date().getUTCSeconds();
    const mins = new Date().getUTCMinutes();
    const hours = new Date().getUTCHours();
    const day = new Date().getDate();
    const month = new Date().getUTCMonth();
    const year = new Date().getFullYear();

    return `${hours - 5}:${mins}:${sec} - ${day}/${month + 1}/${year}`;
}