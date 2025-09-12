
import { useState, useEffect } from "react";

interface MemoryEntry {
  id: string;
  date: string;
  content: string;
  timestamp: number;
}

export default function MemoryJournalPage() {
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [newMemory, setNewMemory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const savedMemories = localStorage.getItem("birthday-memories");
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    }
  }, []);

  const saveMemories = (updatedMemories: MemoryEntry[]) => {
    localStorage.setItem("birthday-memories", JSON.stringify(updatedMemories));
    setMemories(updatedMemories);
  };

  const addMemory = () => {
    if (newMemory.trim()) {
      const memory: MemoryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        content: newMemory,
        timestamp: Date.now()
      };
      const updatedMemories = [memory, ...memories];
      saveMemories(updatedMemories);
      setNewMemory("");
      setIsAdding(false);
    }
  };

  const deleteMemory = (id: string) => {
    const updatedMemories = memories.filter(m => m.id !== id);
    saveMemories(updatedMemories);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="page-title">Memory Journal 📖</h2>
      <p className="subtitle mb-8">Our special moments, saved forever</p>
      
      <div className="mb-8">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full p-4 bg-gradient-to-r from-[var(--primary-lavender)] to-[var(--primary-sky)] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            data-testid="add-memory-button"
          >
            ✨ Add New Memory
          </button>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Write about a special moment..."
              className="w-full h-24 p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
              data-testid="memory-textarea"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={addMemory}
                className="px-6 py-2 bg-[var(--primary-rose)] text-white rounded-xl hover:shadow-lg transition-all"
                data-testid="save-memory-button"
              >
                Save
              </button>
              <button
                onClick={() => {setIsAdding(false); setNewMemory("");}}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:shadow-lg transition-all"
                data-testid="cancel-memory-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {memories.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <div className="text-6xl mb-4">📝</div>
            <p>No memories yet. Start writing your first one!</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-gradient-to-br from-[var(--primary-cream)] to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              data-testid={`memory-${memory.id}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-[var(--primary-rose)] font-semibold">
                  {memory.date}
                </span>
                <button
                  onClick={() => deleteMemory(memory.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  data-testid={`delete-memory-${memory.id}`}
                >
                  ×
                </button>
              </div>
              <p className="text-[var(--text-dark)] leading-relaxed">{memory.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
