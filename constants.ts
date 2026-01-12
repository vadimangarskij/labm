import { Artist, FeedItem, FeedItemType, Service, Track } from './types';

export const APP_NAME = "RED FLOW";

// Keeping Artists for reference or other sections, but main feed uses Releases
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
  },
  {
    id: 'a3',
    name: 'Zubr Bass',
    genre: 'DnB',
    image: 'https://picsum.photos/seed/zubr/400/400',
    followers: '2.1M'
  },
  {
    id: 'a4',
    name: 'Volha Synth',
    genre: 'Синтвейв',
    image: 'https://picsum.photos/seed/volha/400/400',
    followers: '500K'
  }
];

export const MOCK_PLAYLISTS: Artist[] = [
  { id: 'p1', name: 'Минский Вайб', genre: 'Плейлист', image: 'https://picsum.photos/seed/vibeminsk/400/400', followers: 'Likes: 10k' },
  { id: 'p2', name: 'Ночной Дрифт', genre: 'Плейлист', image: 'https://picsum.photos/seed/drift/400/400', followers: 'Likes: 5k' },
  { id: 'p3', name: 'Белорусский Рейв', genre: 'Плейлист', image: 'https://picsum.photos/seed/rave/400/400', followers: 'Likes: 8k' },
  { id: 'p4', name: 'Спокойствие', genre: 'Плейлист', image: 'https://picsum.photos/seed/calm/400/400', followers: 'Likes: 12k' },
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
  },
  {
    id: 't5',
    title: 'Минское Море',
    artist: 'Zubr Bass',
    duration: '3:10',
    cover: 'https://picsum.photos/seed/sea/300/300'
  }
];

export const MOCK_POPULAR_RELEASES = [
  {
    id: 'pr1',
    title: 'Кибер Панк',
    artist: 'Minsk 2077',
    cover: 'https://picsum.photos/seed/punk/400/400',
    followers: 'TOP 1' // reusing field for badge/subtext if needed
  },
  {
    id: 'pr2',
    title: 'Фолк 2.0',
    artist: 'Nemiga',
    cover: 'https://picsum.photos/seed/folk/400/400',
    followers: 'TOP 5'
  },
  {
    id: 'pr3',
    title: 'Бас Арена',
    artist: 'Zubr Bass',
    cover: 'https://picsum.photos/seed/arena/400/400',
    followers: 'Trending'
  },
  {
    id: 'pr4',
    title: 'Ритм Города',
    artist: 'Volha',
    cover: 'https://picsum.photos/seed/city/400/400',
    followers: 'Hot'
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
    data: {
      headline: 'ТВОЙ ЗВУК. ТВОЙ МИНСК. ТВОЕ БУДУЩЕЕ.',
      subline: 'Жидкая революция музыкальной дистрибуции уже здесь.',
      videoPoster: 'https://picsum.photos/seed/concert/800/600'
    }
  },
  {
    id: 'popular_releases', // Was 'artists_list'
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Популярные Релизы',
    data: MOCK_POPULAR_RELEASES
  },
  {
    id: 'new_releases', // Combined new releases into a scrollable list
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Новинки',
    data: [MOCK_TRACKS[0], MOCK_TRACKS[1], MOCK_TRACKS[4]]
  },
  {
    id: 's1',
    type: FeedItemType.SERVICE,
    data: MOCK_SERVICES[0]
  }
];

export const MUSIC_FEED_ITEMS: FeedItem[] = [
  {
    id: 'music_hero',
    type: FeedItemType.HERO,
    data: {
      headline: 'МУЗЫКАЛЬНЫЕ МИРЫ',
      subline: 'Подборки для любого настроения.',
      videoPoster: 'https://picsum.photos/seed/musicbg/800/400'
    }
  },
  {
    id: 'playlists',
    type: FeedItemType.HORIZONTAL_LIST,
    title: 'Плейлисты',
    data: MOCK_PLAYLISTS
  },
  {
    id: 't1',
    type: FeedItemType.RELEASE,
    data: MOCK_TRACKS[2]
  },
  {
    id: 't2',
    type: FeedItemType.RELEASE,
    data: MOCK_TRACKS[3]
  },
  {
    id: 't3',
    type: FeedItemType.RELEASE,
    data: MOCK_TRACKS[0]
  }
];
