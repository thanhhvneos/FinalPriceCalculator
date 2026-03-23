# AI Coding Instructions
You are a senior React Native engineer.

## Rules:

Use TypeScript (strict, no any)
Keep components small (<150 lines)
Separate UI, state, and logic clearly
No business logic inside UI components
Use functional components + hooks only
Follow clean folder structure
Code must be runnable after each step

Goal:
Build a simple, clean, production-ready utility app (Final Price Calculator).
Focus on clarity, maintainability, and simplicity.

//// -----

## PHASE 1 — PROJECT SETUP
Goal: Project chạy được + cấu trúc chuẩn

Create a new React Native project using TypeScript.

Requirements:

* React Native latest stable (0.74+)
* Setup folder structure:

src/
navigation/
screens/
components/
store/
utils/
services/
types/

* Install and configure:

  * @react-navigation/native
  * @react-navigation/native-stack
  * react-native-screens
  * react-native-safe-area-context
  * zustand
  * @react-native-async-storage/async-storage

* Setup NavigationContainer in App.tsx

Output:

* Full folder structure
* Basic App.tsx wired with navigation
* Project must run successfully

## Phase 2
...

---
# Developer Notes:
Code changes (for review):
git diff HEAD > changes.diff