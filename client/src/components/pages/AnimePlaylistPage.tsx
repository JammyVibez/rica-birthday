
import { useState, useEffect } from "react";

interface Song {
  id: string;
  title: string;
  anime: string;
  artist: string;
  youtubeUrl?: string;
  note?: string;
}

const defaultSongs: Song[] = [
  {
    id: "1",
    title: "My Soul, Your Beats!",
    anime: "Angel Beats",
    artist: "Lia",
    youtubeUrl: "https://www.youtube.com/watch?v=zIFV8UUs1-c",
    note: "The opening that started it all! 💖"
  },
  {
    id: "2",
    title: "Ichiban no Takaramono",
    anime: "Angel Beats",
    artist: "LiSA",
    youtubeUrl: "https://www.youtube.com/watch?v=tm7Xf9818FM",
    note: "Kanade's song - makes me think of you"
  },
  {
    id: "3",
    title: "Sparkle",
    anime: "Your Name",
    artist: "RADWIMPS",
    youtubeUrl: "https://www.youtube.com/watch?v=a2GujJZfXpg",
    note: "Beautiful and emotional, just like you"
  },
  {
    id: "4",
    title: "Always With Me",
    anime: "Spirited Away",
    artist: "Youmi Kimura",
    youtubeUrl: "https://www.youtube.com/watch?v=0sKFXDfEapE",
    note: "A classic that never gets old"
  }
];

export default function AnimePlaylistPage() {
  const [songs, setSongs] = useState<Song[]>(defaultSongs);
  const [isAdding, setIsAdding] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    anime: "",
    artist: "",
    youtubeUrl: "",
    note: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("anime-playlist");
    if (saved) {
      setSongs(JSON.parse(saved));
    }
  }, []);

  const saveSongs = (updatedSongs: Song[]) => {
    localStorage.setItem("anime-playlist", JSON.stringify(updatedSongs));
    setSongs(updatedSongs);
  };

  const addSong = () => {
    if (newSong.title && newSong.anime) {
      const song: Song = {
        ...newSong,
        id: Date.now().toString()
      };
      saveSongs([...songs, song]);
      setNewSong({ title: "", anime: "", artist: "", youtubeUrl: "", note: "" });
      setIsAdding(false);
    }
  };

  const removeSong = (id: string) => {
    saveSongs(songs.filter(s => s.id !== id));
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="page-title">Anime Playlist 🎶</h2>
      <p className="subtitle mb-8">Songs that remind me of you and our favorite anime</p>
      
      {/* Add New Song */}
      <div className="mb-8">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full p-4 bg-gradient-to-r from-[var(--primary-rose)] to-[var(--primary-lavender)] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            data-testid="add-song-button"
          >
            🎵 Add New Song
          </button>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Song Title"
                value={newSong.title}
                onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
                data-testid="song-title-input"
              />
              <input
                type="text"
                placeholder="Anime"
                value={newSong.anime}
                onChange={(e) => setNewSong({...newSong, anime: e.target.value})}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
                data-testid="song-anime-input"
              />
              <input
                type="text"
                placeholder="Artist"
                value={newSong.artist}
                onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
                data-testid="song-artist-input"
              />
              <input
                type="text"
                placeholder="YouTube URL (optional)"
                value={newSong.youtubeUrl}
                onChange={(e) => setNewSong({...newSong, youtubeUrl: e.target.value})}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
                data-testid="song-url-input"
              />
            </div>
            <textarea
              placeholder="Personal note about this song..."
              value={newSong.note}
              onChange={(e) => setNewSong({...newSong, note: e.target.value})}
              className="w-full p-3 border rounded-xl h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)] mb-4"
              data-testid="song-note-input"
            />
            <div className="flex gap-3">
              <button
                onClick={addSong}
                className="px-6 py-2 bg-[var(--primary-rose)] text-white rounded-xl hover:shadow-lg transition-all"
                data-testid="save-song-button"
              >
                Save Song
              </button>
              <button
                onClick={() => {setIsAdding(false); setNewSong({ title: "", anime: "", artist: "", youtubeUrl: "", note: "" });}}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:shadow-lg transition-all"
                data-testid="cancel-song-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Songs List */}
      <div className="space-y-6">
        {songs.map((song) => {
          const embedUrl = song.youtubeUrl ? getYouTubeEmbedUrl(song.youtubeUrl) : null;
          
          return (
            <div
              key={song.id}
              className="bg-gradient-to-br from-white to-[var(--primary-cream)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              data-testid={`song-${song.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary-rose)] mb-1">
                    {song.title}
                  </h3>
                  <p className="text-[var(--text-muted)]">
                    {song.anime} • {song.artist}
                  </p>
                </div>
                <button
                  onClick={() => removeSong(song.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  data-testid={`remove-song-${song.id}`}
                >
                  ×
                </button>
              </div>
              
              {song.note && (
                <p className="font-dancing text-lg text-[var(--text-dark)] mb-4 italic">
                  "{song.note}"
                </p>
              )}
              
              {embedUrl && (
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <iframe
                    src={embedUrl}
                    title={song.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              
              {song.youtubeUrl && !embedUrl && (
                <a
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--primary-rose)] hover:underline"
                >
                  🎵 Listen on YouTube
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
