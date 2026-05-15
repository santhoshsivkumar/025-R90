const RULES = [
  {
    title: "🧠 Identity Rules",
    items: [
      {
        icon: "⚡",
        text: 'You are not "trying to be healthy". You ARE a disciplined person now.',
      },
      {
        icon: "🪞",
        text: 'Before every decision ask: "Would the healthiest version of me do this?"',
      },
      {
        icon: "🎯",
        text: "Every decision must match your identity — food, sleep, habits, all of it.",
      },
    ],
  },
  {
    title: "📵 Digital Detox",
    items: [
      {
        icon: "🚫",
        text: "Zero social media scrolling — Instagram, YouTube shorts, Twitter, Reddit.",
      },
      { icon: "⏰", text: "No phone for first 1 hour after waking up." },
      { icon: "📴", text: "Phone on DND / silent from 10 PM to 7 AM." },
      {
        icon: "🧹",
        text: "Uninstall all entertainment apps. No exceptions for 90 days.",
      },
    ],
  },
  {
    title: "✅ Allowed Apps",
    tags: [
      "WhatsApp (limited)",
      "Maps",
      "Banking",
      "Camera",
      "Calendar",
      "Notes",
      "Music (focus)",
      "Kindle/Reading",
    ],
    tagColor: "g",
  },
  {
    title: "📱 Phone Rules",
    items: [
      { icon: "📏", text: "Max 1 hour screen time per day (non-work)." },
      {
        icon: "🙈",
        text: "No phone at meals. No phone in bed. No phone in bathroom.",
      },
      {
        icon: "🧊",
        text: "If urge to scroll hits — 10 pushups instead. Rewire the impulse.",
      },
    ],
  },
  {
    title: "🌙 Sleep Protocol",
    items: [
      { icon: "🛏️", text: "In bed by 10:15 PM. Lights out by 10:30 PM." },
      {
        icon: "⏰",
        text: "Wake up at 5:45 AM. No snooze. Feet on floor immediately.",
      },
      {
        icon: "📵",
        text: "No screens 30 minutes before sleep. Read a book instead.",
      },
      { icon: "🌡️", text: "Room should be cool and dark. No phone near bed." },
    ],
  },
  {
    title: "✨ Appearance & Hygiene",
    items: [
      {
        icon: "🚿",
        text: "Cold shower every morning. Skincare AM + PM (moisturizer, sunscreen).",
      },
      {
        icon: "👔",
        text: "Dress clean even at home. Iron your clothes. Stand tall.",
      },
      {
        icon: "💇",
        text: "Haircut every 3 weeks. Nails trimmed. Fragrance daily.",
      },
      {
        icon: "🪥",
        text: "Brush + tongue scraper + mouthwash. Twice a day, no excuses.",
      },
    ],
  },
  {
    title: "🧘 Mental Rules",
    items: [
      {
        icon: "📝",
        text: "Journal 5 minutes every night — wins, lessons, tomorrow's plan.",
      },
      {
        icon: "🙅",
        text: "No complaining. No excuses. No negotiation with yourself.",
      },
      {
        icon: "🤐",
        text: "Don't announce your goals. Let results make the noise.",
      },
      {
        icon: "🧠",
        text: "If you break a rule, don't spiral. Reset immediately. One slip ≠ failure.",
      },
    ],
  },
  {
    title: "📚 Books to Read",
    tags: [
      "Atomic Habits",
      "Deep Work",
      "Can't Hurt Me",
      "The Compound Effect",
      "12 Rules for Life",
    ],
    tagColor: "b",
  },
  {
    title: "⚠️ Warning",
    items: [
      {
        icon: "💀",
        text: 'This is not a "challenge". This is identity reconstruction.',
      },
      {
        icon: "🔥",
        text: "If it were easy, everyone would look and feel amazing. They don't.",
      },
      {
        icon: "⛓️",
        text: "The chain of discipline is lighter than the chain of regret.",
      },
    ],
  },
];

export default function RulesTab() {
  return (
    <div className="rules-tab">
      <h2 className="sec-title">📋 Protocol Rules</h2>
      {RULES.map((section, idx) => (
        <div
          key={section.title}
          className="card fade-up"
          style={{ "--d": idx }}
        >
          <div className="rule-section-title">{section.title}</div>
          {section.items &&
            section.items.map((item, i) => (
              <div key={i} className="rule-item">
                <span className="rule-icon">{item.icon}</span>
                <span className="rule-text">{item.text}</span>
              </div>
            ))}
          {section.tags && (
            <div className="tags">
              {section.tags.map((tag) => (
                <span key={tag} className={`tag tag-${section.tagColor}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
