"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, difficultyPoints, getRank, shuffleArray, type Question } from "@/data/questions";
import ResultScreen from "./ResultScreen";

type QuizProps = {
  playerName: string;
  onComplete: () => void;
  onHome: () => void;
};

type AnswerState = "unanswered" | "correct" | "wrong";

export default function Quiz({ playerName, onComplete, onHome }: QuizProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  // Timer
  useEffect(() => {
    if (answerState !== "unanswered" || isFinished || !currentQuestion) return;

    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answerState, isFinished, currentQuestion]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (answerState !== "unanswered" || !currentQuestion) return;

      const isCorrect = optionIndex >= 0 && currentQuestion.options[optionIndex].isCorrect;
      setSelectedOption(optionIndex);

      if (isCorrect) {
        const timeBonus = Math.floor(timeLeft * 5);
        const newStreak = streak + 1;
        const newMultiplier = Math.min(1 + (newStreak - 1) * 0.25, 3);
        const points = Math.floor((difficultyPoints[currentQuestion.difficulty] + timeBonus) * newMultiplier);

        setScore((s) => s + points);
        setStreak(newStreak);
        setComboMultiplier(newMultiplier);
        setBestStreak((b) => Math.max(b, newStreak));
        setCorrectCount((c) => c + 1);
        setAnswerState("correct");
      } else {
        setStreak(0);
        setComboMultiplier(1);
        setAnswerState("wrong");
      }

      setShowExplanation(true);
    },
    [answerState, currentQuestion, streak, timeLeft]
  );

  const nextQuestion = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      saveScore();
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswerState("unanswered");
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(20);
    }
  };

  const saveScore = () => {
    const entry = {
      name: playerName,
      score: score,
      correct: correctCount,
      total: shuffledQuestions.length,
      bestStreak: bestStreak,
      rank: getRank(score).title,
      date: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("cyberQuizLeaderboard") || "[]");
    existing.push(entry);
    existing.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    localStorage.setItem("cyberQuizLeaderboard", JSON.stringify(existing.slice(0, 50)));
  };

  if (!currentQuestion && !isFinished) {
    return (
      <div className="text-center text-cyber-green font-mono">
        <div className="text-4xl mb-4 animate-pulse">⚡</div>
        Loading quiz...
      </div>
    );
  }

  if (isFinished) {
    return (
      <ResultScreen
        score={score}
        correctCount={correctCount}
        totalQuestions={shuffledQuestions.length}
        bestStreak={bestStreak}
        playerName={playerName}
        onHome={onHome}
        onPlayAgain={() => {
          setShuffledQuestions(shuffleArray(questions));
          setCurrentIndex(0);
          setScore(0);
          setStreak(0);
          setBestStreak(0);
          setCorrectCount(0);
          setAnswerState("unanswered");
          setSelectedOption(null);
          setShowExplanation(false);
          setTimeLeft(20);
          setIsFinished(false);
          setComboMultiplier(1);
        }}
        onLeaderboard={onComplete}
      />
    );
  }

  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;
  const timerColor = timeLeft > 10 ? "text-cyber-green" : timeLeft > 5 ? "text-cyber-orange" : "text-cyber-red";
  const timerBarColor = timeLeft > 10 ? "bg-cyber-green" : timeLeft > 5 ? "bg-cyber-orange" : "bg-cyber-red";

  const categoryIcons: Record<string, string> = {
    phishing: "🎣",
    passwords: "🔑",
    "social-engineering": "🎭",
    malware: "🦠",
    network: "🌐",
    general: "🛡️",
  };

  const difficultyColors: Record<string, string> = {
    easy: "text-cyber-green border-cyber-green/30",
    medium: "text-cyber-orange border-cyber-orange/30",
    hard: "text-cyber-red border-cyber-red/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full"
    >
      {/* Top Bar: Score, Streak, Progress */}
      <div className="flex items-center justify-between mb-4 text-sm font-mono">
        <div className="flex items-center gap-4">
          <span className="text-cyber-green">
            ⚡ {score.toLocaleString()}
          </span>
          {streak > 1 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-cyber-orange fire-flicker"
            >
              🔥 x{streak} {comboMultiplier > 1 && `(${comboMultiplier.toFixed(2)}x)`}
            </motion.span>
          )}
        </div>
        <span className="text-gray-500">
          {currentIndex + 1}/{shuffledQuestions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-green to-cyber-blue rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Timer */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-mono font-bold text-lg ${timerColor} min-w-[2ch] text-right`}>
          {timeLeft}
        </span>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${timerBarColor} rounded-full transition-all`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="neon-border rounded-xl p-6 mb-6 bg-cyber-card/80 backdrop-blur-sm"
        >
          {/* Category & Difficulty */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm bg-gray-800 rounded-full px-3 py-1">
              {categoryIcons[currentQuestion.category]} {currentQuestion.category.replace("-", " ")}
            </span>
            <span className={`text-xs border rounded-full px-2 py-0.5 uppercase font-mono ${difficultyColors[currentQuestion.difficulty]}`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Scenario */}
          <h2 className="text-lg md:text-xl font-semibold leading-relaxed mb-6 text-gray-100">
            {currentQuestion.scenario}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-300 font-medium ";

              if (answerState === "unanswered") {
                btnClass += "border-gray-700 bg-gray-800/50 hover:border-cyber-green/50 hover:bg-cyber-green/5 hover:shadow-[0_0_15px_rgba(0,255,136,0.1)] cursor-pointer";
              } else if (selectedOption === i) {
                btnClass += option.isCorrect
                  ? "border-cyber-green bg-cyber-green/10 shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                  : "border-cyber-red bg-cyber-red/10 shadow-[0_0_20px_rgba(255,51,102,0.2)]";
              } else if (option.isCorrect && answerState === "wrong") {
                btnClass += "border-cyber-green/50 bg-cyber-green/5";
              } else {
                btnClass += "border-gray-800 bg-gray-900/50 opacity-50";
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answerState !== "unanswered"}
                  whileHover={answerState === "unanswered" ? { scale: 1.01 } : {}}
                  whileTap={answerState === "unanswered" ? { scale: 0.99 } : {}}
                  className={btnClass}
                >
                  {option.text}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explanation & Meme Reaction */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Meme Reaction */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className={`text-center p-4 rounded-xl mb-4 ${
                answerState === "correct"
                  ? "bg-cyber-green/10 border border-cyber-green/30"
                  : "bg-cyber-red/10 border border-cyber-red/30"
              }`}
            >
              <div className="text-4xl mb-2">
                {answerState === "correct" ? "✅" : "❌"}
              </div>
              <p className={`font-bold text-lg mb-1 ${
                answerState === "correct" ? "text-cyber-green" : "text-cyber-red"
              }`}>
                {answerState === "correct" ? "Correct!" : timeLeft <= 0 && selectedOption === -1 ? "Time's Up!" : "Not Quite!"}
              </p>
              <p className="text-gray-300 text-sm italic">
                {answerState === "correct" ? currentQuestion.memeCorrect : currentQuestion.memeWrong}
              </p>
            </motion.div>

            {/* Explanation */}
            <div className="neon-border-blue rounded-xl p-4 mb-6 bg-cyber-blue/5">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-cyber-blue font-semibold">💡 Why? </span>
                {currentQuestion.explanation}
              </p>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextQuestion}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full cyber-btn bg-cyber-green/10 border border-cyber-green/50 text-cyber-green font-bold py-3 rounded-lg hover:bg-cyber-green/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all"
            >
              {currentIndex + 1 >= shuffledQuestions.length ? "🏁 See Results" : "➡️ Next Question"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
