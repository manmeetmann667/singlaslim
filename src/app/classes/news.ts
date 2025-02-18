import firebase from "firebase";

export class News{
    newsId: string;
    news: string;
    status: boolean;
    createdOn: firebase.firestore.Timestamp
}