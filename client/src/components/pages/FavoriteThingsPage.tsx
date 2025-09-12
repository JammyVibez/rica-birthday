
import { useState, useEffect } from "react";

interface FavoriteItem {
  id: string;
  category: string;
  emoji: string;
  items: string[];
}

const initialFavorites: FavoriteItem[] = [
  { id: "anime", category: "Favorite Anime", emoji: "🎬", items: ["Angel Beats", "Your Name", "Spirited Away"] },
  { id: "foods", category: "Favorite Foods", emoji: "🍜", items: ["Ramen", "Sushi", "Matcha Ice Cream"] },
  { id: "colors", category: "Favorite Colors", emoji: "🌈", items: ["Lavender", "Sky Blue", "Rose Pink"] },
  { id: "music", category: "Favorite Music", emoji: "🎵", items: ["Anime OSTs", "J-Pop", "Lo-fi"] },
  { id: "activities", category: "Things You Love", emoji: "✨", items: ["Drawing", "Reading Manga", "Watching Sunsets"] },
  { id: "characters", category: "Favorite Characters", emoji: "👼", items: ["Kanade (Angel Beats)", "Chihiro (Spirited Away)"] }
];

export default function FavoriteThingsPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);

  useEffect(() => {
    const saved = localStorage.getItem("favorite-things");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveFavorites = (updatedFavorites: FavoriteItem[]) => {
    localStorage.setItem("favorite-things", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const addItem = (categoryId: string) => {
    const newItem = prompt("Add a new favorite:");
    if (newItem && newItem.trim()) {
      const updatedFavorites = favorites.map(fav => 
        fav.id === categoryId 
          ? { ...fav, items: [...fav.items, newItem.trim()] }
          : fav
      );
      saveFavorites(updatedFavorites);
    }
  };

  const removeItem = (categoryId: string, itemIndex: number) => {
    const updatedFavorites = favorites.map(fav => 
      fav.id === categoryId 
        ? { ...fav, items: fav.items.filter((_, i) => i !== itemIndex) }
        : fav
    );
    saveFavorites(updatedFavorites);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="page-title">Favorite Things 🎨</h2>
      <p className="subtitle mb-8">All the things that make you smile</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            data-testid={`category-${category.id}`}
          >
            <h3 className="flex items-center gap-2 text-xl font-semibold text-[var(--primary-rose)] mb-4">
              {category.emoji} {category.category}
            </h3>
            
            <div className="space-y-2 mb-4">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[var(--primary-cream)] rounded-xl p-3 group"
                  data-testid={`item-${category.id}-${index}`}
                >
                  <span className="text-[var(--text-dark)]">{item}</span>
                  <button
                    onClick={() => removeItem(category.id, index)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all text-sm"
                    data-testid={`remove-${category.id}-${index}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => addItem(category.id)}
              className="w-full p-3 border-2 border-dashed border-[var(--primary-lavender)] rounded-xl text-[var(--primary-rose)] hover:bg-[var(--primary-cream)] transition-colors"
              data-testid={`add-${category.id}`}
            >
              + Add new favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
