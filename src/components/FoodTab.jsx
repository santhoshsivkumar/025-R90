const BANNED = [
  "Sugar",
  "Maida",
  "Processed food",
  "Soft drinks",
  "Chips",
  "Biscuits",
  "Fried junk",
  "Packaged snacks",
  "Ice cream",
  "Alcohol",
];

const MEALS = [
  {
    name: "Breakfast",
    time: "7:00 - 7:30 AM",
    icon: "🍳",
    items: [
      { text: "Eggs (boiled/omelette)", color: "g" },
      { text: "Oats + banana", color: "g" },
      { text: "Idli + eggs", color: "b" },
      { text: "Dosa + paneer", color: "b" },
      { text: "Poha + peanuts", color: "o" },
    ],
  },
  {
    name: "Lunch",
    time: "1:00 - 1:20 PM",
    icon: "🍱",
    items: [
      { text: "Rice + dal + veggies", color: "g" },
      { text: "Chicken/Fish curry", color: "g" },
      { text: "Paneer + chapati", color: "b" },
      { text: "Curd rice", color: "o" },
      { text: "Egg curry + rice", color: "b" },
    ],
  },
  {
    name: "Evening Snack",
    time: "4:30 - 5:00 PM",
    icon: "🍌",
    items: [
      { text: "Fruits (banana, apple)", color: "g" },
      { text: "Handful of nuts", color: "g" },
      { text: "Black coffee", color: "o" },
      { text: "Sprouts", color: "b" },
    ],
  },
  {
    name: "Dinner",
    time: "7:15 - 8:00 PM",
    icon: "🥘",
    items: [
      { text: "Chapati + sabzi", color: "g" },
      { text: "Rice + eggs", color: "b" },
      { text: "Paneer + veggies", color: "g" },
      { text: "Dal + rice (light)", color: "o" },
    ],
  },
];

export default function FoodTab() {
  return (
    <div className="food-tab">
      <h2 className="sec-title">🍽️ Food Protocol</h2>

      <div className="card fade-up" style={{ "--d": "0" }}>
        <div className="card-label">🚫 Banned Foods</div>
        <div className="tags">
          {BANNED.map((item) => (
            <span key={item} className="tag tag-r">
              {item}
            </span>
          ))}
        </div>
      </div>

      {MEALS.map((meal, idx) => (
        <div
          key={meal.name}
          className="meal-card card fade-up"
          style={{ "--d": idx + 1 }}
        >
          <div className="meal-head">
            <span className="meal-icon">{meal.icon}</span>
            <div>
              <div className="meal-title">{meal.name}</div>
              <div className="meal-time">{meal.time}</div>
            </div>
          </div>
          <div className="tags">
            {meal.items.map((item) => (
              <span key={item.text} className={`tag tag-${item.color}`}>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="card fade-up" style={{ "--d": MEALS.length + 1 }}>
        <div className="card-label">💧 Water Rule</div>
        <p style={{ color: "var(--text2)", lineHeight: 1.6 }}>
          Drink 3–4 liters of water daily. Start with 1 glass immediately upon
          waking. Carry a bottle everywhere. No excuses.
        </p>
      </div>
    </div>
  );
}
