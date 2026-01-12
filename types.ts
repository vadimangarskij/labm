export enum FeedItemType {
  RELEASE = 'RELEASE',
  SERVICE = 'SERVICE',
  ARTIST = 'ARTIST',
  HERO = 'HERO',
  HORIZONTAL_LIST = 'HORIZONTAL_LIST' // New type for carousels
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  followers: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  title?: string; // Optional title for sections
  data: Artist | Track | Service | any | any[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
