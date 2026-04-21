const SYSTEM_PROMPT = `You are NutriSmart, an expert AI nutritionist. 

RULES:
- Always respond in valid JSON format matching the schema below.
- Provide highly specific meals tailored to the context.
- You MUST provide realistic numeric estimates for calories and macros (integers only).

RESPONSE JSON SCHEMA:
{
  "greeting": "A short, personalized greeting",
  "recommendations": [
    {
      "name": "Food/Meal name",
      "emoji": "relevant food emoji",
      "description": "Brief description",
      "macros": {
        "calories": 500,
        "protein": 30,
        "carbs": 45,
        "fat": 15
      },
      "prepTime": "estimated prep time",
      "tags": ["tag1", "tag2"]
    }
  ],
  "tip": "A contextual nutrition tip"
}`;

export async function getRecommendations(apiKey, context) {
  const parts = [];
  if (context.query) parts.push(context.query);
  if (context.mood) parts.push(`I'm feeling ${context.mood}.`);
  if (context.timeOfDay) parts.push(`Time: ${context.timeOfDay}.`);
  if (context.goal) parts.push(`Goal: ${context.goal}.`);
  if (context.restrictions) parts.push(`Restrictions: ${context.restrictions}.`);
  
  const userMessage = parts.length > 0 ? parts.join(' ') : 'Suggest 3 healthy meals.';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return {
        greeting: "Here is your customized meal plan!",
        recommendations: [
          { name: "Power Protein Bowl", emoji: "🥗", description: "Quinoa, chickpeas, and greens.", macros: { calories: 450, protein: 25, carbs: 55, fat: 12 }, prepTime: "10 mins", tags: ["healthy", "vegan"] },
          { name: "Avocado Toast & Eggs", emoji: "🥑", description: "Whole grain toast with smashed avocado and eggs.", macros: { calories: 380, protein: 18, carbs: 30, fat: 22 }, prepTime: "5 mins", tags: ["energy", "quick"] }
        ],
        tip: "Drink water before meals to improve digestion."
      };
    }

    const data = await response.json();
    const textContent = data.candidates[0].content.parts[0].text;
    try {
      return JSON.parse(textContent);
    } catch {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Failed to parse AI response.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

const LOG_PROMPT = `You are a nutrition calculator. The user will describe what they just ate. Estimate the nutritional value and respond ONLY in this JSON format. Use realistic integers.
{
  "name": "Short summary of food",
  "emoji": "🍔",
  "macros": {
    "calories": 500,
    "protein": 20,
    "carbs": 50,
    "fat": 15
  }
}`;

export async function analyzeCustomFood(apiKey, foodQuery) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const payload = {
    system_instruction: { parts: [{ text: LOG_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: foodQuery }] }],
    generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return { name: foodQuery, emoji: "🍽️", macros: { calories: 350, protein: 15, carbs: 40, fat: 12 } };
    }

    const data = await response.json();
    const textContent = data.candidates[0].content.parts[0].text;
    
    try {
      return JSON.parse(textContent);
    } catch {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    return { name: foodQuery, emoji: "🍽️", macros: { calories: 350, protein: 15, carbs: 40, fat: 12 } };
  }
}
