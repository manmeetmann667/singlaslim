export class Videos {
    videoId: string;
    title: string;
    description: string;
    thumbnailImageUrl: string;
    videoUrl: string;
    addedOn: firebase.default.firestore.Timestamp;
    active: boolean;
  }
  