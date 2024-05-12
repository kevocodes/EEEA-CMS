export interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string;
  completed: boolean;
  thumbnail: string;
  public_id: string;
  creatorId: string;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  images: EventImage[];
}

export interface EventImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface EventDetail extends Event {}

export interface Creator {
  id: string;
  name: string;
  lastname: string;
  email: string;
}
