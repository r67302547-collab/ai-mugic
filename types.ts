
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArtUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverArtUrl: string;
  songs: Song[];
  color: string;
}
