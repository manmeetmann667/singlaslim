import firebase from "firebase";

export class Blog{
    blogId: string;
    title: string;
    description: string;
    imageUrl: string;
    addedOn: firebase.firestore.Timestamp;
    blogStatus: boolean;
}