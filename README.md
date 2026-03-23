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

## Phase 2 — NAVIGATION
Goal: Có 2 màn: Home + History

Implement navigation using React Navigation Native Stack.
Requirements:
* Create AppNavigator.tsx
* Define RootStackParamList with:
  * Home
  * History
* Create placeholder screens:
  * HomeScreen.tsx
  * HistoryScreen.tsx
* Setup navigation:
  * Home is initial screen
  * Add header title for each screen
Output:
* Navigation fully working
* Can navigate between Home and History

## PHASE 3 — TYPES + CORE LOGIC
Goal: Xây nền logic (quan trọng nhất)

Define TypeScript types and calculation logic.
Requirements:
1. Create types:
* CalculationInput
* CalculationResult
* HistoryItem

2. Create calculator utils (pure functions only):
* calculateDiscount
* calculateFinalPrice

Rules:
* No side effects
* Handle undefined values safely
* Never return NaN
* Always return valid numbers

3. Logic must support:
* percentage discount
* max discount cap
* voucher subtraction
* shipping addition

Output:
* Fully typed functions
* Easy to unit test
* Tạo file test cho các function logic mới thêm.

## PHASE 4 — UI SKELETON (NO LOGIC)
Goal: Render UI nhưng chưa có tính toán
Build HomeScreen UI (no business logic yet).

Requirements:
1. Create reusable components:
* InputField (label + numeric input)
* ResultCard (final price + saved amount)
* Section container (optional)

2. HomeScreen layout:
* Price input
* Discount %
* Max discount
* Voucher
* Shipping
* Result section (static for now)
* Save button
* Button to navigate to History

Rules:
* No calculation logic yet
* Use local state or placeholder values
* Clean layout, simple styles

Output:
* Fully rendered UI
* Easy to plug logic later

## PHASE 5 — STATE MANAGEMENT (ZUSTAND)
Goal: Centralize state + logic

Implement Zustand store for calculator state.
Requirements:
State:
* input: CalculationInput
* result: CalculationResult

Actions:
* setField(key, value)
* calculate()

Rules:
* All business logic must be inside store or utils
* No calculation inside components
* calculate() should call utils functions

Output:
* Clean Zustand store
* Easy to use in UI

## PHASE 6 — CONNECT UI + LOGIC
Goal: Real-time calculation

Connect HomeScreen UI with Zustand store.
Requirements:
* Each input updates store via setField
* Trigger calculate() on every change
* ResultCard displays real-time result

Rules:
* No "Calculate" button
* Everything updates automatically
* Avoid unnecessary re-renders

Output:
* Fully working calculator
* Real-time updates

## PHASE 7 — SAVE HISTORY
Goal: Persist data

Implement history persistence using AsyncStorage.
Requirements:
1. Create history service:
* saveHistory(item)
* getHistory()
* clearHistory()

2. Integrate into HomeScreen:
* Save button stores current calculation
* Generate unique id (timestamp)

3. Data structure must use HistoryItem type

Rules:
* Async/await clean handling
* No duplicate logic

Output:
* Save works correctly
* Data persists after reload

## PHASE 8 — HISTORY SCREEN
Goal: Hiển thị + reuse

Implement HistoryScreen.

Requirements:
* Fetch history from storage
* Display list using FlatList

* Show:
  * final price
  * saved amount
  * timestamp

* On item press:
  * Navigate back to Home
  * Restore input values

Rules:
* Clean UI
* No heavy styling

Output:
* Working history list
* Can reuse previous calculations

## PHASE 9 — UX POLISH
Goal: Làm app “có cảm giác tốt”

Improve UX and formatting.

Requirements:
* Format numbers (1,000 style)
* Add currency suffix (configurable)
* Handle empty inputs gracefully
* Prevent invalid values
* Improve spacing and typography
* Make result visually prominent

Optional:
* Expandable breakdown section

Output:
* Clean, user-friendly UI

---
# Developer Notes:
Code changes (for review):
git diff HEAD > changes.diff

Review the current implementation.

Checklist:

- Code is clean and modular
- No business logic inside UI
- Types are correct (no any)
- No duplicated logic
- All features work as expected
- No unnecessary complexity

Suggest improvements if needed.

Test file:
npx jest __tests__/utils/calculator.test.ts --no-coverage