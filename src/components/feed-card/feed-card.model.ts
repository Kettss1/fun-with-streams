type FeedCardUser = {
  id: number;
  image_url: string;
  name: string;
  username: string;
}

export type FeedCardModel = {
  id?: string;
  message: string;
  timestamp: number;
  tags: string[];
  user: FeedCardUser;
}