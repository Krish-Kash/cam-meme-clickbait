"use client";

import { motion } from "framer-motion";
import { getRank } from "@/data/questions";

type ResultScreenProps = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  bestStreak: number;
  playerName: string;
  onHome: () => void;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
};

export default function ResultScreen({
  score,
  correctCount,
  totalQuestions,
  bestStreak,
  playerName,
  onHome,
  onPlayAgain,
  onLeaderboard,
}: ResultScreenProps) {
  const rank = getRank(score);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getVerdict = () => {
    if (percentage >= 90) return { text: "You are the firewall. Nothing gets past you.", emoji: "🔥" };
    if (percentage >= 70) return { text: "Solid awareness! You'd survive most social engineering attacks.", emoji: "💪" };
    if (percentage >= 50) return { text: "Not bad, but maybe don't click that 'You Won an iPhone' ad.", emoji: "😬" };
    if (percentage >= 30) return { text: "The phishing emails are winning. Time for some training!", emoji: "📚" };
    return { text: "You clicked every link, didn't you? We need to talk.", emoji: "🆘" };
  };

  const verdict = getVerdict();

  const stats = [
    { label: "Score", value: score.toLocaleString(), icon: "⚡", color: "text-cyber-green" },
    { label: "Accuracy", value: `${percentage}%`, icon: "🎯", color: "text-cyber-blue" },
    { label: "Correct", value: `${correctCount}/${totalQuestions}`, icon: "✅", color: "text-cyber-green" },
    { label: "Best Streak", value: `${bestStreak}x`, icon: "🔥", color: "text-cyber-orange" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full text-center"
    >
      {/* Rank Badge */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-6"
      >
        <div className="text-7xl mb-3">{rank.emoji}</div>
        <h2 className={`text-3xl md:text-4xl font-extrabold ${rank.color} glow-green mb-1`}>
          {rank.title}
        </h2>
        <p className="text-gray-500 font-mono text-sm">{playerName}</p>
      </motion.div>

      {/* Verdict */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="neon-border rounded-xl p-5 mb-6 gradient-cyber"
      >
        <div className="text-3xl mb-2">{verdict.emoji}</div>
        <p className="text-gray-300 text-lg">{verdict.text}</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="bg-cyber-card rounded-xl p-4 border border-gray-800"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Share text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-6"
      >
        <button
          onClick={() => {
            const text = `🛡️ Cyber or Chill? | CAM 2026\n\n${rank.emoji} ${rank.title}\n⚡ Score: ${score}\n🎯 ${correctCount}/${totalQuestions} correct (${percentage}%)\n🔥 Best streak: ${bestStreak}x\n\nThink you can beat me? 💀`;
            navigator.clipboard.writeText(text);
          }}
          className="cyber-btn bg-cyber-purple/10 border border-cyber-purple/50 text-cyber-purple font-semibold py-2 px-6 rounded-lg hover:bg-cyber-purple/20 transition-all text-sm"
        >
          📋 Copy Score to Share on Slack
        </button>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          onClick={onPlayAgain}
          className="cyber-btn bg-cyber-green/10 border border-cyber-green/50 text-cyber-green font-bold py-3 px-6 rounded-lg hover:bg-cyber-green/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all"
        >
          🔄 Play Again
        </button>
        <button
          onClick={onLeaderboard}
          className="cyber-btn bg-cyber-blue/10 border border-cyber-blue/50 text-cyber-blue font-bold py-3 px-6 rounded-lg hover:bg-cyber-blue/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all"
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={onHome}
          className="cyber-btn bg-gray-800/50 border border-gray-700 text-gray-400 font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all"
        >
          🏠 Home
        </button>
      </motion.div>
    </motion.div>
  );
}
