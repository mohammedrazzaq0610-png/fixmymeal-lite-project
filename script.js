/**
 * FixMyMeal Lite – script.js
 * Logic for Meal Suggestions, Plate Analysis, and UI Interactions.
 */

// --- DATA: MEAL DATABASE ---
const mealDB = {
  mess: {
    acidity: {
      low: { meal: "Curd Rice & Boiled Dal", emoji: "🍚", score: 9, reason: "Curd is a natural probiotic that soothes the stomach lining, while plain dal provides protein without spice.", tradeoff: "Lacks diverse micronutrients from vegetables.", upgrade: "Add a side of steamed carrots or pumpkin (requires ₹20 more).", tips: ["Avoid pickle/papad", "Eat slowly", "Don't drink water during meal"] },
      mid: { meal: "Rice, Dal & Bottle Gourd Sabzi", emoji: "🍲", score: 8, reason: "Bottle gourd (Lauki) is highly alkaline and easy to digest, perfect for cooling acidity.", tradeoff: "Moderate calorie density from white rice.", upgrade: "Swap white rice for brown rice or millet (requires ₹30 more).", tips: ["Avoid tea after meal", "Add a pinch of cumin", "Sit upright for 30 mins"] },
      high: { meal: "Paneer Bhurji & Soft Roti", emoji: "🍳", score: 7, reason: "Soft roti is easier on the gut than fried items; paneer provides quality protein if not too oily.", tradeoff: "Dairy can sometimes trigger reflux in sensitive individuals.", upgrade: "Add a bowl of fresh papaya as a natural digestive enzyme source.", tips: ["Limit oil in bhurji", "Chew each bite 32 times", "Avoid cold drinks"] }
    },
    weakness: {
      low: { meal: "Egg Curry & Rice", emoji: "🥚", score: 8, reason: "Eggs are the most affordable source of complete protein for recovery. Rice provides quick glucose.", tradeoff: "Low in dietary fiber.", upgrade: "Add a seasonal fruit (requires ₹15 more).", tips: ["Have two eggs", "Eat while warm", "Follow with 15 mins rest"] },
      mid: { meal: "Rajma Chawal & Salad", emoji: "🍛", score: 9, reason: "Rajma (Kidney beans) is rich in iron and protein. Salad adds essential vitamins.", tradeoff: "Can cause bloating if beans aren't soaked well.", upgrade: "Add a glass of fresh buttermilk for better protein absorption.", tips: ["Add lemon to salad", "Chew well", "Stay hydrated"] },
      high: { meal: "Chicken Thali (Mess Style)", emoji: "🍗", score: 8, reason: "Provides high-quality animal protein and B-vitamins necessary for energy levels.", tradeoff: "High sodium content in mess-style gravy.", upgrade: "Request 'less oil' or ask for extra salad instead of a second serving of rice.", tips: ["Focus on the meat first", "Avoid heavy sweets", "Drink water 30 mins later"] }
    },
    weightloss: {
      low: { meal: "Moong Dal & 1 Roti", emoji: "🥣", score: 9, reason: "Moong dal is high in fiber and protein, keeping you full longer with minimal calories.", tradeoff: "Low in healthy fats.", upgrade: "Add a teaspoon of ghee for fat-soluble vitamin absorption.", tips: ["Drink water before meal", "Skip rice completely", "Use less salt"] },
      mid: { meal: "Mixed Veg Sabzi & 2 Rotis", emoji: "🥗", score: 8, reason: "Large volume of vegetables provides satiety with low caloric density.", tradeoff: "Wheat roti has moderate glycemic index.", upgrade: "Swap wheat roti for Jowar or Bajra roti for more fiber.", tips: ["Eat salad first", "Walk for 10 mins after", "No dessert"] },
      high: { meal: "Boiled Chicken/Paneer & Salad", emoji: "🥗", score: 10, reason: "Maximum protein, minimum carbs. Perfect for fat loss while maintaining muscle.", tradeoff: "Can feel 'light' or unsatisfying initially.", upgrade: "Add a small portion of quinoa or brown rice if energy feels too low.", tips: ["Add lemon/pepper only", "No mayo/dressing", "Drink green tea after"] }
    },
    general: {
      low: { meal: "Dal Chawal & Aloo Sabzi", emoji: "🍛", score: 7, reason: "A balanced, satisfying meal with essential carbs and proteins.", tradeoff: "High in starch/carbs.", upgrade: "Replace Aloo with a green leafy vegetable.", tips: ["Don't overeat", "Add a fruit later", "Balanced portioning"] },
      mid: { meal: "Full Veg Thali", emoji: "🍽️", score: 8, reason: "Covers all major food groups: Protein (Dal), Carbs (Rice/Roti), Fiber (Sabzi).", tradeoff: "Difficult to track total calorie intake.", upgrade: "Request curd instead of sweet dish.", tips: ["Prioritize vegetables", "Chew slowly", "Drink water slowly"] },
      high: { meal: "Chicken/Paneer Special Thali", emoji: "🍱", score: 8, reason: "A celebratory yet nutritious meal with high protein content.", tradeoff: "Potential for over-saturation of calories.", upgrade: "Walk for 20 mins post-meal to aid digestion.", tips: ["Enjoy the meal", "Avoid fried papad", "Stay active"] }
    }
  },
  home: {
    acidity: {
      low: { meal: "Khichdi & Curd", emoji: "🍚", score: 10, reason: "Lightest possible meal. Rice and moong dal are very gentle on the stomach.", tradeoff: "Lower protein count than a full meal.", upgrade: "Add a stir-fry of spinach (Palak) for iron.", tips: ["Add ginger while cooking", "Eat small portions", "Keep it simple"] },
      mid: { meal: "Poha with Less Oil & Peas", emoji: "🥣", score: 8, reason: "Flattened rice is easy to digest. Peas add a bit of fiber and protein.", tradeoff: "Mostly simple carbohydrates.", upgrade: "Add a handful of roasted peanuts for healthy fats.", tips: ["Avoid too much lemon", "Add curry leaves", "Chew well"] },
      high: { meal: "Oats Porridge with Milk", emoji: "🥛", score: 9, reason: "Oats have soluble fiber that can help absorb excess acid.", tradeoff: "Sweet versions can spike blood sugar.", upgrade: "Use honey instead of sugar and add almonds.", tips: ["Eat warm", "Avoid coffee/tea", "Rest after"] }
    },
    weakness: {
      low: { meal: "Banana & Milk", emoji: "🍌", score: 8, reason: "Immediate energy from banana, sustained energy from milk protein/fats.", tradeoff: "Not a complete meal.", upgrade: "Add a spoon of peanut butter for more calories/protein.", tips: ["Drink slowly", "Have 2 bananas", "Sit while eating"] },
      mid: { meal: "Stuffed Paratha & Curd", emoji: "🫓", score: 7, reason: "Denser calories for those needing an energy boost. Curd helps digestion.", tradeoff: "High in fats/oil if shallow fried.", upgrade: "Use minimal oil and add more vegetable stuffing.", tips: ["Add less salt", "Use whole wheat", "Stay hydrated"] },
      high: { meal: "Chicken Soup & Bread", emoji: "🍲", score: 9, reason: "Hydrating, protein-rich, and easy to consume when feeling low.", tradeoff: "Bread is a refined carb.", upgrade: "Swap bread for a small bowl of brown rice.", tips: ["Add garlic/ginger", "Drink while hot", "Deep breaths"] }
    },
    weightloss: {
      low: { meal: "Cucumber & Sprout Salad", emoji: "🥗", score: 10, reason: "High water content and high protein-to-calorie ratio.", tradeoff: "May not satisfy hunger for long.", upgrade: "Add a small cup of buttermilk.", tips: ["No oily dressing", "Add chaat masala", "Chew thoroughly"] },
      mid: { meal: "Oats Upma with Veggies", emoji: "🍲", score: 9, reason: "Fiber-rich oats and vitamins from vegetables keep you full.", tradeoff: "Requires careful portion control.", upgrade: "Add egg whites on the side for extra protein.", tips: ["Load with veggies", "Use 1 tsp oil", "Eat as lunch"] },
      high: { meal: "Paneer/Tofu Scramble", emoji: "🍳", score: 9, reason: "High protein, low carb, very filling and healthy fats.", tradeoff: "Paneer is calorie-dense.", upgrade: "Eat with a large side of green salad.", tips: ["Use non-stick pan", "Add turmeric", "No paratha"] }
    },
    general: {
      low: { meal: "Roti & Seasonal Sabzi", emoji: "🫓", score: 8, reason: "Basic, balanced home meal that is sustainable long-term.", tradeoff: "Can be monotonous.", upgrade: "Rotate vegetables daily for diverse nutrients.", tips: ["Eat home food often", "Limit oil", "Share with family"] },
      mid: { meal: "Rice, Dal & Fried Fish/Egg", emoji: "🐟", score: 7, reason: "Good mix of protein and carbs, though frying adds extra calories.", tradeoff: "Fried items increase inflammatory fats.", upgrade: "Steam or bake the fish/egg instead of frying.", tips: ["Limit fry portions", "More dal, less rice", "Eat early"] },
      high: { meal: "Full Meal with Sweet Dish", emoji: "🍲", score: 7, reason: "A complete satisfying experience for a healthy metabolism.", tradeoff: "Sugar spike from the sweet.", upgrade: "Have the sweet dish 30 mins after the meal.", tips: ["Portion control", "Don't skip veggies", "Walk later"] }
    }
  },
  street: {
    acidity: {
      low: { meal: "Idli (2 pcs) & Coconut Chutney", emoji: "🧆", score: 9, reason: "Fermented and steamed; very light on the stomach. Avoid sambar if it's too spicy.", tradeoff: "Chutney can be high in fat.", upgrade: "Ask for 'plain idli' without the red chutney.", tips: ["Avoid sambar", "Chew slowly", "Drink water later"] },
      mid: { meal: "Veg Sandwich (No Chutney)", emoji: "🥪", score: 7, reason: "Plain bread and veggies are safer than spicy street options.", tradeoff: "Refined flour in bread.", upgrade: "Request brown bread if available.", tips: ["Avoid mayo/cheese", "No extra spices", "Clean stall only"] },
      high: { meal: "Masala Dosa (Less Oil)", emoji: "🥞", score: 6, reason: "Better than fried snacks, but potato filling can be heavy.", tradeoff: "Often cooked in high-heat reused oil.", upgrade: "Request 'paper dosa' (plain) for less oil and carbs.", tips: ["Limit sambar intake", "Avoid late night", "Check oil quality"] }
    },
    weakness: {
      low: { meal: "Sugarcane Juice & Peanuts", emoji: "🥤", score: 7, reason: "Sugarcane for instant glucose; peanuts for sustained protein/fat.", tradeoff: "High sugar spike; hygiene risk.", upgrade: "Add a squeeze of ginger/lemon to the juice.", tips: ["Check for hygiene", "Drink fresh", "Don't gulp"] },
      mid: { meal: "Egg Roll / Frankie", emoji: "🌯", score: 6, reason: "Provides protein and carbs to keep you going in a pinch.", tradeoff: "Maida (refined flour) and high sodium.", upgrade: "Ask for double egg and no sauces.", tips: ["Limit sauces", "Check egg freshness", "Eat seated"] },
      high: { meal: "Chicken Shawarma (Grilled)", emoji: "🥙", score: 7, reason: "Grilled meat is a better protein source than deep-fried street food.", tradeoff: "Mayonnaise and refined wrap are unhealthy.", upgrade: "Ask for more salad and no mayo/cream.", tips: ["Ensure meat is cooked", "Avoid extra fries", "Drink water"] }
    },
    weightloss: {
      low: { meal: "Boiled Corn with Lemon", emoji: "🌽", score: 9, reason: "Low fat, high fiber, very satisfying and cheap.", tradeoff: "Mostly carbs.", upgrade: "Eat the corn slowly to increase satiety.", tips: ["No butter", "Only lemon/salt", "Great snack"] },
      mid: { meal: "Sprout Chaat", emoji: "🥗", score: 10, reason: "High protein, raw veggies, low calorie. Best street option for health.", tradeoff: "Risk of contamination if not fresh.", upgrade: "Add a piece of fruit on the side.", tips: ["Check freshness", "No fried papdi", "Ask for extra lemon"] },
      high: { meal: "Fruit Chaat", emoji: "🍎", score: 8, reason: "Nature's candy. Provides vitamins and fiber.", tradeoff: "Fruit vendors often add sugar syrup.", upgrade: "Ask for 'no syrup' and 'no extra salt'.", tips: ["Avoid cut fruits", "Eat immediately", "Watch portions"] }
    },
    general: {
      low: { meal: "Vada Pav (1 pc)", emoji: "🍔", score: 4, reason: "High energy, very cheap. Satisfying but not 'healthy'.", tradeoff: "Deep fried and high in refined carbs.", upgrade: "Don't eat the dry garlic chutney if sensitive.", tips: ["Limit to one", "Have a fruit later", "Not for every day"] },
      mid: { meal: "Pav Bhaji", emoji: "🍛", score: 5, reason: "Vegetable mash provides some nutrients, but butter/pav are heavy.", tradeoff: "High saturated fat and refined carbs.", upgrade: "Ask for 'less butter' and extra onions/lemon.", tips: ["Squeeze lemon", "Eat slowly", "Limit pav"] },
      high: { meal: "Plate of Momos (Steamed)", emoji: "🥟", score: 6, reason: "Steamed is better than fried. Veg/Chicken filling adds some nutrition.", tradeoff: "The dough is maida; sauces are very spicy.", upgrade: "Avoid the red chutney and have a light dinner.", tips: ["Chew well", "Steamed only", "Watch the spice"] }
    }
  }
};

const dailyTips = [
  "Drink a glass of water 30 minutes before your meal to improve digestion.",
  "Chew your food 32 times. Digestion starts in the mouth!",
  "Try to include at least one raw vegetable (salad) in every major meal.",
  "Don't lie down immediately after eating; take a 10-minute slow walk.",
  "Replace one cup of tea/coffee with warm lemon water today.",
  "Eat your largest meal during the day when your metabolism is highest.",
  "Avoid drinking very cold water during or immediately after a meal.",
  "Try to finish your dinner at least 2-3 hours before you go to sleep.",
  "Use small plates to naturally control your portion sizes.",
  "Consistency is key. Small healthy changes lead to big results!"
];

// --- UI LOGIC ---

// Tab Switching
function switchTab(tabId) {
  const suggestPanel = document.getElementById('panel-suggest');
  const fixPanel = document.getElementById('panel-fix');
  const suggestTab = document.getElementById('tab-suggest');
  const fixTab = document.getElementById('tab-fix');

  if (tabId === 'suggest') {
    suggestPanel.classList.remove('hidden');
    fixPanel.classList.add('hidden');
    suggestTab.classList.add('active');
    fixTab.classList.remove('active');
  } else {
    suggestPanel.classList.add('hidden');
    fixPanel.classList.remove('panel'); // Fix class logic
    fixPanel.classList.remove('hidden');
    fixPanel.classList.add('panel');
    suggestTab.classList.remove('active');
    fixTab.classList.add('active');
  }
}

// Budget Slider Update
document.getElementById('budget').addEventListener('input', (e) => {
  document.getElementById('budget-val').innerText = `₹${e.target.value}`;
  
  // Dynamic background for slider
  const val = (e.target.value - 50) / (200 - 50) * 100;
  e.target.style.background = `linear-gradient(to right, var(--g500) ${val}%, var(--g200) ${val}%)`;
});

// Auto Suggestion Logic
function onInputChange() {
  const budget = document.getElementById('budget').value;
  const foodType = document.getElementById('food-type').value;
  const health = document.getElementById('health').value;

  // Only auto-suggest if all are picked
  if (foodType && health) {
    getSuggestion(true);
  }
}

// Get Recommendation
function getSuggestion(isAuto = false) {
  const budget = parseInt(document.getElementById('budget').value);
  const foodType = document.getElementById('food-type').value;
  const health = document.getElementById('health').value;

  if (!foodType || !health) {
    if (!isAuto) {
      shakeButton('suggest-btn');
      alert("⚠️ Please select both Food Type and Health Condition!");
    }
    return;
  }

  // Determine Budget Tier
  let tier = 'low';
  if (budget > 140) tier = 'high';
  else if (budget > 80) tier = 'mid';

  const data = mealDB[foodType][health][tier];

  // Update UI
  document.getElementById('r-emoji').innerText = data.emoji;
  document.getElementById('r-meal').innerText = data.meal;
  document.getElementById('r-score').innerText = data.score;
  document.getElementById('r-reason').innerText = data.reason;
  document.getElementById('r-tradeoff').innerText = data.tradeoff;
  document.getElementById('r-upgrade').innerText = data.upgrade;

  // Update Score Ring
  const ring = document.getElementById('r-ring');
  const color = data.score >= 8 ? 'var(--g500)' : data.score >= 6 ? 'var(--amber)' : 'var(--red)';
  ring.style.background = `conic-gradient(${color} ${data.score * 10}%, var(--g200) 0%)`;

  // Update Tips
  const tipsUl = document.getElementById('r-tips');
  tipsUl.innerHTML = '';
  data.tips.forEach(tip => {
    const li = document.createElement('li');
    li.innerText = tip;
    tipsUl.appendChild(li);
  });

  document.getElementById('suggest-result').classList.remove('hidden');
  if(!isAuto) document.getElementById('suggest-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Fix My Plate Analysis
function analysePlate() {
  const selected = Array.from(document.querySelectorAll('#food-grid input:checked')).map(i => i.value);
  
  if (selected.length === 0) {
    shakeButton('fix-btn');
    alert("⚠️ Please select at least one item you ate!");
    return;
  }

  let problems = [];
  let improvements = [];
  let score = 70; // Base score

  // Logic Rules
  if (selected.includes('oily_curry') && selected.includes('fried')) {
    problems.push("Double dose of oil: Both curry and fried snacks are very heavy on fats.");
    improvements.push("Switch fried snacks for a fresh fruit.");
    score -= 25;
  }
  if (selected.includes('soda')) {
    problems.push("Empty sugar: Soda causes insulin spikes and bloating.");
    improvements.push("Replace soda with plain water or buttermilk.");
    score -= 20;
  }
  if (selected.includes('spicy') && !selected.includes('milk')) {
    problems.push("Gut irritant: Spicy food without curd/milk can cause acidity.");
    improvements.push("Add a small bowl of curd (Dahi) to neutralize spices.");
    score -= 15;
  }
  if (selected.includes('sweets') && selected.includes('rice')) {
    problems.push("Carb overload: High starch + refined sugar causes a major energy crash later.");
    improvements.push("Keep sweets for occasional treats, not every meal.");
    score -= 15;
  }
  if (!selected.includes('salad') && !selected.includes('fruit')) {
    problems.push("No fiber: Your meal is missing essential micronutrients and digestive fiber.");
    improvements.push("Add at least one raw salad (cucumber/carrot) next time.");
    score -= 15;
  }
  
  // Positive reinforcements
  if (selected.includes('dal') || selected.includes('egg')) {
    improvements.push("Great job adding protein! It helps muscle recovery.");
    score += 10;
  }
  if (selected.includes('fruit') || selected.includes('salad')) {
    improvements.push("Excellent fiber choice! This keeps your gut happy.");
    score += 10;
  }

  score = Math.max(0, Math.min(100, score));

  // Update UI
  document.getElementById('score-val').innerText = `${score}/100`;
  const bar = document.getElementById('bar-fill');
  bar.style.width = `${score}%`;
  bar.style.backgroundColor = score >= 80 ? 'var(--g500)' : score >= 50 ? 'var(--amber)' : 'var(--red5)';

  const probUl = document.getElementById('fix-problems');
  probUl.innerHTML = '';
  if (problems.length === 0) {
    const li = document.createElement('li');
    li.innerText = "No major issues! Your plate looks balanced.";
    li.style.borderColor = 'var(--g500)';
    li.style.backgroundColor = 'var(--g50)';
    probUl.appendChild(li);
  } else {
    problems.forEach(p => {
      const li = document.createElement('li');
      li.innerText = p;
      probUl.appendChild(li);
    });
  }

  const impUl = document.getElementById('fix-improve');
  impUl.innerHTML = '';
  improvements.forEach(i => {
    const li = document.createElement('li');
    li.innerText = i;
    impUl.appendChild(li);
  });

  document.getElementById('fix-result').classList.remove('hidden');
  document.getElementById('fix-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// UI Utilities
function toggleChip(input) {
  const chip = input.parentElement;
  if (input.checked) chip.classList.add('checked');
  else chip.classList.remove('checked');
}

function showDailyTip() {
  const tipCard = document.getElementById('daily-tip');
  const tipText = document.getElementById('tip-text');
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
  
  tipText.innerText = `💡 ${randomTip}`;
  tipCard.classList.remove('hidden');
}

function closeHint() {
  document.getElementById('demo-hint').style.display = 'none';
}

function shakeButton(id) {
  const btn = document.getElementById(id);
  btn.style.animation = 'shake 0.4s ease';
  setTimeout(() => { btn.style.animation = ''; }, 400);
}

// Add shake keyframes to document
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}`;
document.head.appendChild(styleSheet);
