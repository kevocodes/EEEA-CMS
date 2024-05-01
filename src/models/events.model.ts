export interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string;
  completed: boolean;
  thumbnail: string;
  public_id: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  images: EventImage[];
}

export interface EventImage {
  id: string;
  url: string;
}