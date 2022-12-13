import firestore from '@react-native-firebase/firestore';

export async function getDocsId(path) {
    const ref = await firestore().collection(path).get();
    var ids = [];
    ref.forEach((doc) => ids.push(doc.id));
    return ids;
}

export async function getData(path) {
    const doc = await firestore().doc(path).get();
    return doc.data();
}