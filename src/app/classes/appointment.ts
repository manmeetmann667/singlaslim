import firebase from 'firebase'

export class Appointment{
    appointmentId: string;
    customerName: string;
    customerMobile: string;
    customerAddress: string;
    appointmentDate: any;
    interestedService: string;
    createdOn: firebase.firestore.Timestamp;
}