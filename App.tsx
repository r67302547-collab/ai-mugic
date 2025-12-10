
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainView } from './components/MainView';
import { Player } from './components/Player';
import { Song, Playlist } from './types';
import { playlists } from './data/mockData';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'playlist'>('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectPlaylist = useCallback((playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setActiveView('playlist');
  }, []);

  const handlePlayPlaylist = useCallback((playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setActiveView('playlist');
    if (playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0]);
      setIsPlaying(true);
    }
  }, []);

  const handlePlaySong = useCallback((song: Song, playlist: Playlist) => {
    setCurrentSong(song);
    setSelectedPlaylist(playlist);
    setIsPlaying(true);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (currentSong) {
      setIsPlaying(prev => !prev);
    }
  }, [currentSong]);

  const handleNextSong = useCallback(() => {
    if (selectedPlaylist && currentSong) {
      const currentIndex = selectedPlaylist.songs.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % selectedPlaylist.songs.length;
      setCurrentSong(selectedPlaylist.songs[nextIndex]);
      setIsPlaying(true);
    }
  }, [currentSong, selectedPlaylist]);

  const handlePrevSong = useCallback(() => {
    if (selectedPlaylist && currentSong) {
      const currentIndex = selectedPlaylist.songs.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + selectedPlaylist.songs.length) % selectedPlaylist.songs.length;
      setCurrentSong(selectedPlaylist.songs[prevIndex]);
      setIsPlaying(true);
    }
  }, [currentSong, selectedPlaylist]);

  return (
    <div className="h-screen w-screen bg-black text-spotify-gray-100 p-2 flex flex-col font-sans overflow-hidden">
      <div className="flex-grow flex gap-2 overflow-hidden">
        <Sidebar onSelectPlaylist={handleSelectPlaylist} />
        <MainView 
          activeView={activeView}
          selectedPlaylist={selectedPlaylist}
          onPlayPlaylist={handlePlayPlaylist}
          onPlaySong={handlePlaySong}
        />
      </div>
      {currentSong && (
        <Player 
          song={currentSong} 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause}
          onNext={handleNextSong}
          onPrev={handlePrevSong}
        />
      )}
    </div>
  );
};

export default App;
