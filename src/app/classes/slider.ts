import firebase from "firebase";

export class sliderImages {
    imageId: string;
    title: string;
    description: string;
    imageUrl: string;
    createdOn: firebase.firestore.Timestamp;
    active: boolean;
  }
  