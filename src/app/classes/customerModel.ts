import firebase from 'firebase';


export class CustomerModel {
    adminId: string;
    customerId: string;
    mobile: string;
    createdOn: firebase.firestore.Timestamp;
    status: boolean;
    name: string;
    points: number;
    address: string;
    signal: number; // 0 -> web | 1 -> app

    selectedBranch: string;
    authId: string;
    email: string;
    fatherName: string;
    motherName: string;
    dob: firebase.firestore.Timestamp;
    branchIdList: string[]
    dietChart?: DietChart[];
}

export class WalkInModel {
    totalAmount: number;
    pointsEarn: number;
    oldPointRedeem: number;
    discountAmount: number;
    finalAmount: number;
    remarks: string;
    linkedStaffId: string;
    linkedStaffName: string;
    initialAmount: number;
    balanceAmount: number;
    paymentType: number;//0 full, 1 partial
}

export class DietChart{
    time: string;
    diet: string;
}

export class EnquiryModel {
    courseId: string
    remarks: string;
    remind: boolean;
    date: firebase.firestore.Timestamp;
    endDate: firebase.firestore.Timestamp;
    endRemarks: string;
    status: number;
    serviceId: string;
    serviceName: string;
    interestIndex: number;
    // 0:open, 1: finished, 2: cancelled
}

export class BookModel {
    profileId: string;
    profileName: string;
    profileMobile: string;
    roomId: string;
    roomName: string;
    profileAddress: string;
    remarks: string;
    status: number;
    endRemarks: string;
    endDate: firebase.firestore.Timestamp;
    date: firebase.firestore.Timestamp;
    // 0: booked, 1: finished, 2: cancelled
}

export class AssignCourseModel {
    courseName: string;
    courseId: string;
    batchName: string;
    batchId: string;
    remarks: string;
    date: firebase.firestore.Timestamp;
    status: number;
    startDate: firebase.firestore.Timestamp;
    endDate: firebase.firestore.Timestamp;
    pointsEarn: number;
    actualFees: number;
    firstFees: number;
    balanceFees: number;
    coursePrice: number;
    //status 0: booked, 1: finished, 2: cancelled
}

export class PaymentModel {
    paymentId: string;
    courseId: string;
    batchId: string;
    remarks: string;
    date: firebase.firestore.Timestamp;
    status: boolean;
    amount: number;
    balanceFees: number;
}

export class ServicePaymentModel {
    paymentId: string;
    customerVisitId: string;
    remarks: string;
    date: firebase.firestore.Timestamp;
    status: boolean;
    amount: number;
    balanceFees: number;
}




// visitType
// 0: services
// 1: visit
// 2: appointment
// 3: courses


