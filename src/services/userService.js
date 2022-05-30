import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "./firebase";
const node = "nivensseger/users";

export const AdicionarUsuario = (obj, authUid) => {
    return new Promise((resolve, reject) => {
        setDoc(doc(fireStore, node, authUid), obj)
            .then(rsp => resolve(obj))
            .catch(e => reject(e))
    })
} 