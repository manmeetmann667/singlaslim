import firebase from "firebase";    

export class HealthLog{
    logId: string;
    customerName: string;
    customerId: string;
    signal: number; // 0-> web | 1 -> app
    weight: string;
    createdOn: firebase.firestore.Timestamp;
}