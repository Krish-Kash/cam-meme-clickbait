export type Question = {
  id: number;
  category: "phishing" | "passwords" | "social-engineering" | "malware" | "network" | "general";
  difficulty: "easy" | "medium" | "hard";
  scenario: string;
  detail?: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
  memeCorrect: string;
  memeWrong: string;
};

export const questions: Question[] = [
  {
    id: 1,
    category: "phishing",
    difficulty: "easy",
    scenario: "You receive an email from 'IT-Supp0rt@y0ur-c0mpany.com' asking you to verify your credentials IMMEDIATELY or your account will be deleted in 24 hours.",
    options: [
      { text: "🚨 Phishing! Report it", isCorrect: true },
      { text: "😌 Seems legit, better comply", isCorrect: false },
    ],
    explanation: "Classic phishing! Notice the zeros replacing 'o's in the domain, and the urgent language pressuring you to act fast. Real IT never threatens to delete your account via email.",
    memeCorrect: "🧠 Big brain energy! You didn't fall for the oldest trick in the book.",
    memeWrong: "💀 You just gave your password to a guy named xX_H4ck3r_Xx in a basement.",
  },
  {
    id: 2,
    category: "passwords",
    difficulty: "easy",
    scenario: "Your colleague says: 'I use the same password for everything — it's super long and complex, so it's fine!'",
    options: [
      { text: "❌ Terrible idea, even strong passwords shouldn't be reused", isCorrect: true },
      { text: "✅ Makes sense, one strong password is enough", isCorrect: false },
    ],
    explanation: "If one service gets breached, attackers try that password everywhere (credential stuffing). Use a unique password for each account + a password manager!",
    memeCorrect: "🏆 Password manager gang rise up! You understand defense in depth.",
    memeWrong: "🤡 One breach and ALL your accounts go brrrrr...",
  },
  {
    id: 3,
    category: "social-engineering",
    difficulty: "medium",
    scenario: "Someone in a suit is following closely behind you through a badge-access door. They smile and say 'Thanks, forgot my badge today!'",
    options: [
      { text: "🚪 Politely ask them to badge in or contact reception", isCorrect: true },
      { text: "😊 Hold the door — they look professional", isCorrect: false },
    ],
    explanation: "This is 'tailgating' — a social engineering technique. Looking professional means nothing. Always verify, never assume. It's not rude, it's security!",
    memeCorrect: "🛡️ Zero trust isn't just for networks — it's for doors too!",
    memeWrong: "🎭 Congrats, you just let a social engineer walk into your building wearing a suit from Goodwill.",
  },
  {
    id: 4,
    category: "malware",
    difficulty: "medium",
    scenario: "You find a USB drive in the parking lot labeled 'Salary Info Q4 2026 — Confidential'",
    options: [
      { text: "🗑️ Turn it in to security, don't plug it in", isCorrect: true },
      { text: "👀 Plug it in — I need to know who's making more than me", isCorrect: false },
    ],
    explanation: "USB drop attacks are a real thing! Attackers deliberately leave infected USBs in public areas. Curiosity killed the cat... and your network security.",
    memeCorrect: "😎 You resisted the forbidden knowledge. The security team thanks you.",
    memeWrong: "🔥 Congratulations, your curiosity just installed a reverse shell. HR isn't even that interesting.",
  },
  {
    id: 5,
    category: "phishing",
    difficulty: "hard",
    scenario: "Your CEO sends you a Slack DM: 'Hey, I need you to buy 5 Amazon gift cards for a client meeting. I'll reimburse you. Keep this between us.' Their profile picture and name match perfectly.",
    options: [
      { text: "🎣 This is a BEC scam — verify through another channel", isCorrect: true },
      { text: "💳 The CEO asked, better not question it", isCorrect: false },
    ],
    explanation: "Business Email Compromise (BEC) / impersonation scams cost companies billions. No legitimate executive asks employees to buy gift cards secretly. Always verify through a different channel!",
    memeCorrect: "🕵️ You just saved the company from a gift card scam. The real CEO probably doesn't even know what Amazon gift cards are.",
    memeWrong: "🎁 Plot twist: That wasn't your CEO. That was a scammer in Nigeria who now has $500 in Amazon credit.",
  },
  {
    id: 6,
    category: "network",
    difficulty: "easy",
    scenario: "You're at a coffee shop and connect to 'FREE_WiFi_No_Password' to check your bank account.",
    options: [
      { text: "☠️ Terrible idea — use VPN or mobile data for sensitive stuff", isCorrect: true },
      { text: "☕ Free WiFi = free productivity, what could go wrong?", isCorrect: false },
    ],
    explanation: "Open WiFi networks can be set up by anyone, including attackers running man-in-the-middle attacks. Never access sensitive accounts on untrusted networks without a VPN.",
    memeCorrect: "🔐 VPN users are basically the Navy SEALs of coffee shop WiFi.",
    memeWrong: "📡 The hacker sitting two tables over just watched you type your bank password. Enjoy your latte!",
  },
  {
    id: 7,
    category: "general",
    difficulty: "medium",
    scenario: "A pop-up on a website says: '⚠️ YOUR COMPUTER IS INFECTED WITH 47 VIRUSES! Click here to scan now! ⚠️' with flashing red text.",
    options: [
      { text: "🙄 Scareware — close the tab immediately", isCorrect: true },
      { text: "😱 47 viruses?! Better click to fix it", isCorrect: false },
    ],
    explanation: "This is scareware — fake security alerts designed to trick you into downloading actual malware or paying for fake antivirus. Real antivirus software doesn't yell at you through browser pop-ups.",
    memeCorrect: "😌 Calm, collected, unbothered. You know your antivirus doesn't communicate via pop-up ads.",
    memeWrong: "🦠 Ironic. You now actually have 47 viruses. The pop-up was a prophecy.",
  },
  {
    id: 8,
    category: "passwords",
    difficulty: "hard",
    scenario: "Your company requires password changes every 30 days. Your strategy: 'Password1!', 'Password2!', 'Password3!'...",
    options: [
      { text: "🤦 Predictable patterns defeat the purpose — use a password manager", isCorrect: true },
      { text: "🧮 Technically different passwords each time, right?", isCorrect: false },
    ],
    explanation: "Sequential patterns are the first thing attackers try. Modern guidance (NIST) actually recommends LONGER passwords changed less often over short passwords changed frequently. Use a password manager!",
    memeCorrect: "📖 You've read the NIST guidelines. You're basically a cybersecurity scholar.",
    memeWrong: "🔢 Attackers literally have scripts that try Password1 through Password9999. You're not slick.",
  },
  {
    id: 9,
    category: "social-engineering",
    difficulty: "hard",
    scenario: "You get a call from 'Microsoft Support' saying they've detected unusual activity on your computer. They ask you to install a remote access tool so they can 'fix' it.",
    options: [
      { text: "📵 Hang up — Microsoft doesn't cold-call people", isCorrect: true },
      { text: "🖥️ Let them help — Microsoft knows their stuff", isCorrect: false },
    ],
    explanation: "Tech support scams are extremely common. Microsoft, Apple, Google — none of them will ever call you unsolicited. The 'remote access tool' gives them full control of your machine.",
    memeCorrect: "☎️ *click* That's the sound of you saving yourself from disaster.",
    memeWrong: "🎮 You just gave a stranger remote control of your computer. They're now mining crypto on your machine.",
  },
  {
    id: 10,
    category: "general",
    difficulty: "easy",
    scenario: "You need to share a sensitive document with a colleague. Best approach?",
    options: [
      { text: "🔒 Use the company's approved secure file sharing platform", isCorrect: true },
      { text: "📧 Email it — email is basically the same thing", isCorrect: false },
    ],
    explanation: "Email is not encrypted end-to-end by default. Company-approved platforms have access controls, audit trails, and encryption. Plus, you won't accidentally CC the wrong person!",
    memeCorrect: "✅ Proper channels, proper security. The compliance team just shed a happy tear.",
    memeWrong: "📬 You just emailed a confidential doc and CC'd 'all-company' instead of 'all-team'. Classic.",
  },
  {
    id: 11,
    category: "malware",
    difficulty: "medium",
    scenario: "A website asks you to disable your antivirus to download a 'free' premium software tool.",
    options: [
      { text: "🚩 Massive red flag — legitimate software never asks this", isCorrect: true },
      { text: "💰 Free premium software? Worth the risk!", isCorrect: false },
    ],
    explanation: "If software needs your antivirus disabled to install, it's almost certainly malware. Legitimate software works alongside security tools, not against them.",
    memeCorrect: "🏴 You spotted more red flags than a bullfight. Well done.",
    memeWrong: "🆓 'Free' software that costs you your entire identity. What a deal!",
  },
  {
    id: 12,
    category: "phishing",
    difficulty: "hard",
    scenario: "You receive an email with a QR code saying 'Scan to update your MFA settings — mandatory by end of day.' It looks like it came from your company's security team.",
    options: [
      { text: "🔍 Don't scan — verify with the security team directly first", isCorrect: true },
      { text: "📱 It's from security, better comply quickly", isCorrect: false },
    ],
    explanation: "QR code phishing ('quishing') is a growing attack vector. QR codes can lead to credential harvesting pages. Always verify urgent security requests through official channels.",
    memeCorrect: "🕵️ QR codes are just URLs in disguise. You didn't fall for the digital Trojan horse.",
    memeWrong: "📸 You just scanned a QR code to a phishing page. Your MFA is now someone else's MFA.",
  },
  {
    id: 13,
    category: "network",
    difficulty: "medium",
    scenario: "Your friend sends you a shortened URL (bit.ly/t0tally-s4fe) and says 'check this out, it's hilarious!'",
    options: [
      { text: "🔗 Preview/expand the URL first before clicking", isCorrect: true },
      { text: "😂 My friend sent it, must be safe!", isCorrect: false },
    ],
    explanation: "Shortened URLs hide the actual destination. Your friend's account could be compromised, or they might have been tricked too. Use URL preview tools (add '+' to bit.ly links) to check first.",
    memeCorrect: "🔬 URL expander users are the forensic scientists of the internet.",
    memeWrong: "🐟 Your friend's account was hacked 3 days ago. That link is not funny. At all.",
  },
  {
    id: 14,
    category: "general",
    difficulty: "easy",
    scenario: "You're posting a selfie on social media from your desk. Your monitor shows your email inbox and a sticky note with a password is visible.",
    options: [
      { text: "📸 Retake without sensitive info visible", isCorrect: true },
      { text: "🤳 Post it — who zooms into backgrounds anyway?", isCorrect: false },
    ],
    explanation: "OSINT (Open Source Intelligence) analysts zoom into EVERYTHING. Attackers regularly harvest credentials and sensitive info from social media photos. Clean your background!",
    memeCorrect: "🧹 Clean desk, clean photo, clean conscience. OPSEC king/queen!",
    memeWrong: "🔍 Someone on Reddit already enhanced your photo and read your password. It's 'Fluffy2023'. Really?",
  },
  {
    id: 15,
    category: "social-engineering",
    difficulty: "hard",
    scenario: "You receive a voicemail from your 'manager' asking you to urgently wire transfer funds to a new vendor. The voice sounds exactly like them.",
    options: [
      { text: "🤖 Could be AI deepfake — verify through a separate channel", isCorrect: true },
      { text: "🗣️ I'd recognize that voice anywhere — process the transfer", isCorrect: false },
    ],
    explanation: "AI voice cloning can replicate anyone's voice from just a few seconds of audio. Deepfake voice attacks are on the rise. ALWAYS verify financial requests through a separate, trusted channel.",
    memeCorrect: "🤖 You just defeated a deepfake. Sarah Connor would be proud.",
    memeWrong: "🎙️ That wasn't your manager. That was an AI trained on their LinkedIn videos. The money is gone.",
  },
];

export const difficultyPoints: Record<string, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
};

export const ranks = [
  { minScore: 0, title: "Script Kiddie", emoji: "👶", color: "text-gray-400" },
  { minScore: 500, title: "Help Desk Hero", emoji: "🦸", color: "text-cyber-blue" },
  { minScore: 1000, title: "Firewall Whisperer", emoji: "🔥", color: "text-cyber-orange" },
  { minScore: 1500, title: "Penetration Tester", emoji: "🕵️", color: "text-cyber-purple" },
  { minScore: 2000, title: "Security Architect", emoji: "🏗️", color: "text-cyber-green" },
  { minScore: 2500, title: "CISO Material", emoji: "👑", color: "text-cyber-yellow" },
];

export function getRank(score: number) {
  return [...ranks].reverse().find((r) => score >= r.minScore) || ranks[0];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
