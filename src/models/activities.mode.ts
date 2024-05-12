export interface Activity {
  id: string;
  title: string;
  datetime: string;
  creatorId: string;
  isAllDay: boolean;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
}

export interface Creator {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface ActivityDetail extends Activity {}
