export interface Activity {
  id: string;
  title: string;
  datetime: string;
  creatorId: string;
  isAllDay: boolean;
  createdAt: string;
  updatedAt: string;
  creator: string;
}

export interface ActivityDetail extends Activity {}
