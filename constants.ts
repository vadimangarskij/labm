
import { Artist, FeedItem, FeedItemType, Service, Track } from './types';

export const APP_NAME = "MAX LAB";

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    name: 'Nemiga Cyber Choir',
    genre: 'Нео-Фолк',
    image: 'https://picsum.photos/seed/nemiga/400/400',
    followers: '1.2M'
  },
  {
    id: 'a2',
    name: 'Minsk 2077',
    genre: 'Индастриал',
    image: 'https://picsum.photos/seed/minsk/400/400',
    followers: '850K'
  }
];

export const MOCK_PLAYLISTS: Artist[] = [
  { id: 'p1', name: 'Минский Вайб', genre: 'Плейлист', image: 'https://picsum.photos/seed/vibeminsk/400/400', followers: 'Likes: 10k' },
  { id: 'p2', name: 'Ночной Дрифт', genre: 'Плейлист', image: 'https://picsum.photos/seed/drift/400/400', followers: 'Likes: 5k' },
  { id: 'p3', name: 'Белорусский Рейв', genre: 'Плейлист', image: 'https://picsum.photos/seed/rave/400/400', followers: 'Likes: 8k' },
];

export const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Красный Горизонт',
    artist: 'Minsk 2077',
    duration: '3:45',
    cover: 'https://picsum.photos/seed/red/300/300'
  },
  {
    id: 't2',
    title: 'Жидкий Бетон',
    artist: 'Nemiga Cyber Choir',
    duration: '4:12',
    cover: 'https://picsum.photos/seed/concrete/300/300'
  },
  {
    id: 't3',
    title: 'Эхо Леса',
    artist: 'Zubr Bass',
    duration: '2:58',
    cover: 'https://picsum.photos/seed/forest/300/300'
  },
  {
    id: 't4',
    title: 'Неоновый Дождь',
    artist: 'Volha Synth',
    duration: '3:20',
    cover: 'https://picsum.photos/seed/rain/300/300'
  }
];

export const HERO_SLIDES = [
  {
    headline: 'MAX LAB. ТВОЙ ЗВУК.',
    subline: 'Жидкая революция музыкальной дистрибуции.',
    videoPoster: 'https://picsum.photos/seed/lab-hero/1200/800'
  },
  {
    headline: 'НЕЙРОННЫЙ МАСТЕРИНГ.',
    subline: 'Аналоговый звук в один клик.',
    videoPoster: 'https://picsum.photos/seed/ai-master/1200/800'
  },
  {
    headline: 'MINSK CYBERPUNK.',
    subline: 'Новые релизы локальной сцены.',
    videoPoster: 'https://picsum.photos/seed/minsk-night/1200/800'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'AI Мастеринг',
    description: 'Мгновенный аналоговый звук с помощью нейросетей.',
    price: '75 BYN',
    icon: 'Zap'
  },
  {
    id: 's2',
    title: 'Дистрибуция',
    description: 'Выгрузка на 150+ площадок (Yandex, VK, Spotify).',
    price: '15%',
    icon: 'Globe'
  }
];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'hero',
    type: FeedItemType.HERO,
    data: HERO_SLIDES
  },
  {
    id: 'popular_releases',
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Популярные Релизы',
    data: MOCK_TRACKS.map(t => ({ ...t, image: t.cover, followers: 'Hot' }))
  },
  {
    id: 'new_releases',
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Новинки Лаборатории',
    data: [MOCK_TRACKS[0], MOCK_TRACKS[1], MOCK_TRACKS[2], MOCK_TRACKS[3]]
  }
];

export const MUSIC_FEED_ITEMS: FeedItem[] = [
  {
    id: 'music_hero',
    type: FeedItemType.HERO,
    data: [
      {
        headline: 'МУЗЫКАЛЬНЫЕ МИРЫ',
        subline: 'Экспериментальные подборки от MAX LAB.',
        videoPoster: 'https://picsum.photos/seed/musicbg/800/400'
      },
      {
        headline: 'НОЧНОЙ ПОТОК',
        subline: 'Лучшее для твоего дрифта.',
        videoPoster: 'https://picsum.photos/seed/nightdrive/800/400'
      }
    ]
  },
  {
    id: 'playlists',
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Плейлисты',
    data: MOCK_PLAYLISTS
  }
];
