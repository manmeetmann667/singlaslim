import firebase from "firebase";
import { DietChart } from "./customerModel";

export class Diet{
    dietId: string;
    title : string;
    customerId?: string;
    customerName?: string;
    dietChart: DietChart[];
    branchId: string;
    // status: boolean
    createdOn: firebase.firestore.Timestamp;
    remarks?: string;
    assignedOn: firebase.firestore.Timestamp;
}