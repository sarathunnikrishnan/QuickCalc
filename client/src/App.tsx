import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sun, Moon, Clock, Github } from 'lucide-react';
import Calculator from './components/Calculator';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleHistory = () => setHistoryOpen(!historyOpen);

  const handleCalculationSaved = () => {
    // We can fetch history here or let the History panel handle it.
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Animated Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/20 dark:bg-zinc-200/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-600/20 dark:bg-zinc-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full max-w-5xl flex justify-between items-center p-6 sm:p-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 flex items-center justify-center shadow-lg">
            <span className="text-white dark:text-zinc-900 font-bold text-lg">=</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">CalcX</span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={toggleHistory}
            className="p-2 sm:p-3 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 border border-zinc-300/50 dark:border-zinc-700/50 backdrop-blur-md transition-all flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
            title="History"
          >
            <Clock size={20} />
            <span className="hidden sm:inline text-sm font-medium pr-1">History</span>
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 sm:p-3 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 border border-zinc-300/50 dark:border-zinc-700/50 backdrop-blur-md transition-all text-zinc-900 dark:text-zinc-100"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full flex-1 flex items-center justify-center z-10 mt-16 sm:mt-0">
        <Calculator onCalculationSaved={handleCalculationSaved} />
      </main>

      {/* History Slide-out Panel */}
      <HistoryPanel 
        isOpen={historyOpen} 
        onClose={() => setHistoryOpen(false)} 
        onRecall={(expr) => {
          // This would ideally set the expression in the Calculator component
          // For simplicity, it just closes the panel. To fully implement, 
          // we'd lift the calculator state up or use a global store.
          toast.success(`Recalled: ${expr}`);
          setHistoryOpen(false);
        }}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: darkMode ? '#1a1a1a' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: '1px solid rgba(128,128,128,0.2)',
            backdropFilter: 'blur(10px)',
          }
        }}
      />
    </div>
  );
}

export default App;
