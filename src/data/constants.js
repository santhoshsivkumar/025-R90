export const SCHEDULE = [
  { t: '05:45', e: '06:00', name: 'Wake Up', detail: 'Drink 1 glass of water immediately. Step outside for morning sunlight. No phone for the next hour.' },
  { t: '06:00', e: '06:20', name: 'Mobility & Stretching', detail: 'Full body stretching. Hip flexors, thoracic spine, shoulders. Set a calm focused tone.' },
  { t: '06:20', e: '06:40', name: 'Bodyweight Activation', detail: 'Pushups ×20, Squats ×20, Plank 60s. Get blood flowing before the day begins.' },
  { t: '06:40', e: '07:00', name: 'Bath & Grooming', detail: 'Cold shower. Skincare: moisturizer + sunscreen. Dress clean. You earn your appearance.' },
  { t: '07:00', e: '07:30', name: 'Breakfast', detail: 'Eggs + oats + banana / Idli + eggs / Dosa + paneer. Protein + complex carbs. No sugar.' },
  { t: '07:30', e: '13:00', name: 'Deep Focused Work', detail: 'No multitasking. No random scrolling. Phone away. Stand every hour. Proper posture.' },
  { t: '13:00', e: '13:20', name: 'Lunch', detail: 'Rice + vegetables + protein (chicken/fish/eggs/paneer/dal) + curd. No phone at table.' },
  { t: '13:20', e: '13:30', name: '10-Minute Walk', detail: 'Go outside. Sunlight on skin. Let your mind rest. Digest properly. Breathe.' },
  { t: '13:30', e: '16:30', name: 'Afternoon Work', detail: 'Continue focused work. Stay hydrated. No social media. If tired, walk 2 mins then return.' },
  { t: '16:30', e: '18:00', name: 'Evening Snack', detail: 'Fruit + nuts only. Black coffee if needed. Nothing processed. Your discipline window.' },
  { t: '18:00', e: '19:15', name: 'Workout', detail: "Today's training block. Full effort. Phone away. This hour shapes your body and mind." },
  { t: '19:15', e: '20:00', name: 'Dinner', detail: 'Light and clean. Chapati + protein / rice + eggs / paneer + vegetables. Eat slowly.' },
  { t: '20:00', e: '21:30', name: 'Reading & Learning', detail: 'Atomic Habits / Deep Work / Can\'t Hurt Me. 30+ minutes minimum. No entertainment scrolling.' },
  { t: '21:30', e: '22:15', name: 'Night Routine', detail: 'Skincare. Brush + tongue scraper. Prep clothes for tomorrow. Wind down completely.' },
  { t: '22:15', e: '05:45', name: 'Sleep', detail: 'Lights out. No phone. This is when your body rebuilds muscle, skin, and mind. Protect it.' },
];

export const WORKOUTS = {
  0: { day: 'Monday', focus: 'Push Day', icon: '💥', color: '#6366f1', exs: ['Pushups — 4 × 15-20 reps', 'Incline Pushups — 3 × 12 reps', 'Diamond Pushups — 3 × 10 reps', 'Dips (chair) — 3 × 12 reps', 'Pike Pushups — 3 × 10 reps', 'Lateral Raises (bottles) — 3 × 15 reps'] },
  1: { day: 'Tuesday', focus: 'Leg Day', icon: '🦵', color: '#10b981', exs: ['Squats — 4 × 20 reps', 'Sumo Squats — 3 × 15 reps', 'Reverse Lunges — 3 × 12 each leg', 'Bulgarian Split Squat — 3 × 10 each', 'Calf Raises — 4 × 25 reps', 'Wall Sit — 3 × 45 seconds'] },
  2: { day: 'Wednesday', focus: 'Pull Day', icon: '💪', color: '#f59e0b', exs: ['Backpack Rows — 4 × 12 reps', 'Towel Rows (door) — 3 × 10 reps', 'Superman holds — 3 × 15 reps', 'Bicep Curls (bottles/bag) — 3 × 12 reps', 'Face Pulls (towel) — 3 × 15 reps', 'Reverse Snow Angels — 3 × 15'] },
  3: { day: 'Thursday', focus: 'Mobility & Core', icon: '🧘', color: '#8b5cf6', exs: ['Full body stretching — 15 mins', 'Plank — 3 × 60 seconds', 'Side Plank — 3 × 30 sec each side', 'Dead Bug — 3 × 12 reps', 'Bird Dog — 3 × 10 each', 'Hip 90/90 stretch — 5 mins'] },
  4: { day: 'Friday', focus: 'Full Body', icon: '🔥', color: '#ef4444', exs: ['Pushups — 3 × 15 reps', 'Squats — 3 × 20 reps', 'Dips — 3 × 10 reps', 'Lunges — 3 × 12 each leg', 'Pike Pushups — 3 × 10 reps', 'Backpack Rows — 3 × 12 reps', 'Plank — 3 × 45 sec'] },
  5: { day: 'Saturday', focus: 'Posture & Core', icon: '🎯', color: '#06b6d4', exs: ['Wall Angels — 3 × 15 reps', 'Towel Pull-Aparts — 3 × 20 reps', 'Chin Tucks — 3 × 15 reps', 'Glute Bridge — 3 × 20 reps', 'Plank with shoulder taps — 3 × 60 sec', 'Hollow Body Hold — 3 × 30 sec'] },
  6: { day: 'Sunday', focus: 'Recovery', icon: '🌿', color: '#94a3b8', exs: ['Light walk — 20-30 mins outdoors', 'Full body stretching — 20 mins', 'Deep breathing exercises — 5 mins', 'Weekly reflection: wins and lessons', 'Prep meals and clothes for next week', 'Sleep by 10:15 PM sharp'] },
};

export const HABITS = [
  { id: 'wakeup', label: 'Woke up at 5:45 AM', icon: '⏰', time: '5:45 AM' },
  { id: 'nophone', label: 'No phone first hour', icon: '📵', time: '5:45-6:45 AM' },
  { id: 'sunlight', label: 'Morning sunlight', icon: '☀️', time: '5:45 AM' },
  { id: 'workout', label: 'Workout completed', icon: '💪', time: '6:00 PM' },
  { id: 'clean_eat', label: 'Clean eating all day', icon: '🥗', time: 'All day' },
  { id: 'water', label: '3-4L water today', icon: '💧', time: 'All day' },
  { id: 'reading', label: '30 min reading', icon: '📚', time: '8:00 PM' },
  { id: 'skincare', label: 'Skincare routine done', icon: '✨', time: '6:40 AM + 9:30 PM' },
  { id: 'no_scroll', label: 'Zero social scrolling', icon: '🚫', time: 'All day' },
  { id: 'sleep', label: 'In bed by 10:15 PM', icon: '🌙', time: '10:15 PM' },
];

export const MOTTOS = [
  '"Would the healthiest version of me do this?"',
  '"You are not trying. You are a disciplined person now."',
  '"Control should make you stronger and calmer."',
  '"Every decision must match your identity."',
  '"The person you\'ll be in 90 days watches every choice you make today."',
  '"Discipline is choosing what you want most over what you want now."',
  '"Real health. Not obsession. Real sustainable transformation."',
  '"Self-respect changes how you look more than people realize."',
];

export const QUOTES = [
  '"The man who moves a mountain begins by carrying away small stones." — Confucius',
  '"We are what we repeatedly do. Excellence is not an act, but a habit." — Aristotle',
  '"It never gets easier. You just get stronger."',
  '"Your body can stand almost anything. It\'s your mind you must convince."',
  '"One day or day one. You decide."',
  '"The pain you feel today will be the strength you feel tomorrow."',
];
