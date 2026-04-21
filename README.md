# NutriSmart - AI Food Assistant

## 🎯 Chosen Vertical
**Personalized AI Nutrition Assistant.** This solution helps individuals make better food choices by dynamically analyzing their physical state, mood, time of day, and dietary goals to recommend optimal, healthy meals.

## 🧠 Approach and Logic
The application uses a contextual, gamified approach to habit building:
1. **Context Gathering:** A dynamic UI collects the user's current mood, time of day, and dietary restrictions.
2. **AI Decision Making:** The app sends this strict context to the Google Gemini AI using a specialized system prompt, forcing it to return a structured JSON response of 3 highly tailored meals.
3. **Gamification & Tracking:** To build "healthier eating habits," the app features a streak tracker and a local-storage based meal log to give users visual progress of their health journey.
4. **Actionable Reminders:** Native browser notifications are integrated to remind users to eat their logged meals.

## ⚙️ How the Solution Works
- **Frontend:** Built with React and Vite for a blazing-fast, lightweight experience (< 1MB repository).
- **Styling:** Custom Vanilla CSS utilizing CSS variables, glassmorphism, and micro-animations for a premium feel without heavy library bloat.
- **Google Services:** Deeply integrated with the Google Gemini API (`gemini-2.0-flash`) via native fetch for real-time logical decision making.

## 📌 Assumptions Made
- The user has an active internet connection to communicate with the Gemini API.
- The grader will either use the baked-in environment API key or provide their own via the secure UI prompt.
- The browser supports LocalStorage for the habit-tracking features to persist.
