"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LeaderboardEntry = {
  name: string;
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  rank: string;
  date: string;
};

type LeaderboardProps = {
  onHome: () => void;
  onPlayAgain: () => void;
};

export default function Leaderboard({ onHome, onPlayAgain }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cyberQuizLeaderboard") || "[]");
    setEntries(data);
  }, []);

  const clearLeaderboard = () => {
    if (confirm("Clear the leaderboard? This can't be undone.")) {
      localStorage.removeItem("cyberQuizLeaderboard");
      setEntries([]);
    }
  };

  const medalEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-2xl w-full"
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="text-3xl font-extrabold text-cyber-blue glow-blue mb-1">
          Hall of Fame
        </h2>
        <p className="text-gray-500 font-mono text-sm">
          The legends who didn&apos;t click the phishing link
        </p>
      </div>

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="neon-border-blue rounded-xl p-8 text-center mb-6"
        >
          <div className="text-4xl mb-3">👻</div>
          <p className="text-gray-400 text-lg mb-1">No entries yet!</p>
          <p className="text-gray-600 text-sm">Be the first to claim the throne.</p>
        </motion.div>
      ) : (
        <div className="space-y-2 mb-6">
          {entries.map((entry, i) => (
            <motion.div
              key={`${entry.name}-${entry.date}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                i === 0
                  ? "bg-cyber-yellow/5 border-cyber-yellow/30"
                  : i === 1
                  ? "bg-gray-400/5 border-gray-400/20"
                  : i === 2
                  ? "bg-cyber-orange/5 border-cyber-orange/20"
                  : "bg-cyber-card border-gray-800"
              }`}
            >
              <span className={`text-xl min-w-[2.5rem] text-center ${i < 3 ? "text-2xl" : "text-gray-500 font-mono text-sm"}`}>
                {medalEmoji(i)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-200 truncate">{entry.name}</span>
                  <span className="text-xs text-gray-600 font-mono">{entry.rank}</span>
                </div>
                <div className="text-xs text-gray-500 font-mono flex gap-3 mt-0.5">
                  <span>🎯 {entry.correct}/{entry.total}</span>
                  <span>🔥 {entry.bestStreak}x streak</span>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span className="text-cyber-green font-mono font-bold text-lg">
                {entry.score.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onPlayAgain}
          className="cyber-btn bg-cyber-green/10 border border-cyber-green/50 text-cyber-green font-bold py-3 px-6 rounded-lg hover:bg-cyber-green/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all"
        >
          🚀 Play
        </button>
        <button
          onClick={onHome}
          className="cyber-btn bg-cyber-blue/10 border border-cyber-blue/50 text-cyber-blue font-bold py-3 px-6 rounded-lg hover:bg-cyber-blue/20 transition-all"
        >
          🏠 Home
        </button>
        {entries.length > 0 && (
          <button
            onClick={clearLeaderboard}
            className="cyber-btn bg-cyber-red/10 border border-cyber-red/30 text-cyber-red/70 font-bold py-3 px-6 rounded-lg hover:bg-cyber-red/20 transition-all text-sm"
          >
            🗑️ Clear
          </button>
        )}
      </div>
    </motion.div>
  );
}
