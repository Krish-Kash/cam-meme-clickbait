"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "@/components/Quiz";
import Leaderboard from "@/components/Leaderboard";

type Screen = "home" | "quiz" | "leaderboard";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full text-center"
          >
            {/* Logo / Title */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <div className="text-7xl mb-4">🛡️</div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-2">
                <span className="text-cyber-green glow-green">CYBER</span>{" "}
                <span className="text-gray-500">or</span>{" "}
                <span className="text-cyber-red glow-red">CHILL?</span>
              </h1>
              <p className="text-lg text-gray-400 font-mono">
                CAM 2026 · Meme & Chill Thursday Edition
              </p>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="neon-border rounded-xl p-6 mb-8 gradient-cyber backdrop-blur-sm"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                Think you can spot a phishing email from a mile away? Know your way around social engineering?
                <br />
                <span className="text-cyber-green font-semibold">15 scenarios. Meme reactions. Zero judgment.</span>
                <br />
                <span className="text-gray-500 text-sm">
                  (Okay, maybe a little judgment if you click suspicious links.)
                </span>
              </p>
            </motion.div>

            {/* Player Name Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="relative max-w-xs mx-auto">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-green font-mono text-sm">
                  {">"}_
                </span>
                <input
                  type="text"
                  placeholder="Enter your hacker alias..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={20}
                  className="w-full bg-cyber-dark border border-cyber-green/30 rounded-lg py-3 pl-12 pr-4 text-cyber-green font-mono text-sm focus:outline-none focus:border-cyber-green/60 focus:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all placeholder:text-gray-600"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && playerName.trim()) setScreen("quiz");
                  }}
                />
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => {
                  if (!playerName.trim()) {
                    setPlayerName("Anonymous Hacker");
                  }
                  setScreen("quiz");
                }}
                className="cyber-btn bg-cyber-green/10 border border-cyber-green/50 text-cyber-green font-bold py-3 px-8 rounded-lg hover:bg-cyber-green/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all text-lg"
              >
                🚀 Start Quiz
              </button>
              <button
                onClick={() => setScreen("leaderboard")}
                className="cyber-btn bg-cyber-blue/10 border border-cyber-blue/50 text-cyber-blue font-bold py-3 px-8 rounded-lg hover:bg-cyber-blue/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all text-lg"
              >
                🏆 Leaderboard
              </button>
            </motion.div>

            {/* Footer badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-wrap justify-center gap-3 text-xs font-mono text-gray-600"
            >
              {["🔒 HTTPS Secured", "🧠 Brain Required", "☕ Coffee Recommended", "0️⃣ Zero Days Exploited"].map((badge) => (
                <span key={badge} className="border border-gray-800 rounded-full px-3 py-1">
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {screen === "quiz" && (
          <Quiz
            key="quiz"
            playerName={playerName || "Anonymous Hacker"}
            onComplete={() => setScreen("leaderboard")}
            onHome={() => setScreen("home")}
          />
        )}

        {screen === "leaderboard" && (
          <Leaderboard
            key="leaderboard"
            onHome={() => setScreen("home")}
            onPlayAgain={() => setScreen("quiz")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
