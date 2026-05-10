import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Clock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface HistoryItem {
  _id: string;
  expression: string;
  result: string;
  timestamp: string;
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRecall: (expression: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, onRecall }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/history');
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to fetch history', error);
      toast.error('Failed to connect to backend server (Make sure npm run dev is running in the server folder and MongoDB is connected)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const clearHistory = async () => {
    try {
      await axios.delete('http://localhost:5000/api/history');
      setHistory([]);
      toast.success('History cleared');
    } catch (error) {
      toast.error('Failed to clear history');
    }
  };

  const deleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);
      setHistory(prev => prev.filter(item => item._id !== id));
      toast.success('Item deleted');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm glass rounded-none border-l border-zinc-300/50 dark:border-zinc-700/50 z-50 flex flex-col"
          >
            <div className="p-6 border-b border-zinc-300/50 dark:border-zinc-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Clock className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                History
              </h2>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                    title="Clear All History"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="text-center text-zinc-500 dark:text-zinc-400 mt-10">Loading...</div>
              ) : history.length === 0 ? (
                <div className="text-center text-zinc-500 dark:text-zinc-400 mt-10">No history yet</div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors relative group"
                    onClick={() => onRecall(item.expression)}
                  >
                    <button
                      onClick={(e) => deleteItem(e, item._id)}
                      className="absolute top-2 left-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all"
                      title="Delete item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 text-right">{item.expression} =</div>
                    <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-right">{item.result}</div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
