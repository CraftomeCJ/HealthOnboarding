# DailyVita - Health Onboarding Application

A React Native application for collecting user health preferences, dietary restrictions, and lifestyle habits to generate personalized vitamin recommendations. Built with Recoil for state management and React Navigation.

---

## ✅ **Objectives**

### 1. **State & Data Management**
| Objective                  | Implementation Details |
|----------------------------|------------------------|
| **Carry Data Through Flow** | Recoil `formState` atom persists selections across all screens:<br>`selectedConcerns`, `diets`, `allergies`, `sunExposure`, etc. |
| **Static JSON Data**       | `dataLoader.ts` loads health concerns, diets, and allergies from JSON files. Includes data corrections (e.g., "Vegaterian" → "Vegetarian"). |
| **Prioritized Order**      | Drag-and-drop reordering in `HealthConcernsScreen.tsx` updates `prioritizedConcerns` atom. |

### 2. **Validation & Error Handling**
| Screen               | Validation Logic |
|----------------------|------------------|
| **Health Concerns**  | Enforces 1-5 selections, disables excess choices. |
| **Diets**            | Validates "None" or ≥1 diet selection. |
| **Questionnaire**    | Requires answers to all lifestyle questions. |
| **Error Feedback**   | `Alert.alert()` for missing selections (e.g., `DietSelectionScreen.tsx`). |

### 3. **Form Management & Logging**
- **Final Output** constructed in `QuestionnaireScreen.tsx` includes:
  ```typescript
  {
    health_concerns: prioritizedConcerns.map((c, i) => ({ ...c, priority: i+1 })),
    diets: form.diets,
    allergies: mappedAllergies,
    sunExposure: form.sunExposure
  }
  ```
- Logged via `console.log('Final Selections:', ...)` on submission.

---

## 🛠 **Areas for Improvement**

### 1. **Progress Bar Implementation**
| Issue                  | Recommendation |
|------------------------|----------------|
| **Hardcoded Values**   | Replace `progress = 0.2` (HealthConcernsScreen) with dynamic calculation using `stepState`. |
| **Unused stepState**   | Link `progressState` to navigation steps:<br>`[0.2, 0.4, 0.6, 0.8, 1.0]` for 5 screens. |

### 2. **Code Cleanliness**
- Remove redundant progress props from `<ProgressBar progress={...}>` (now uses Recoil).
- Centralize validation logic into reusable hooks.

---

## 🚀 **Setup**
1. Install dependencies:
   ```bash
   npm install recoil react-native-draggable-flatlist
   ```
2. Run:
   ```bash
   npx react-native start
   ```

---

## 📂 **File Structure**
```
src/
├── state/
│   ├── formState.ts       # Recoil atoms (formState, progressState)
├── screens/
│   ├── HealthConcernsScreen.tsx  # Drag-and-drop prioritization
│   ├── DietSelectionScreen.tsx   # Diet toggling logic
│   ├── AllergiesScreen.tsx       # Allergy tag management
│   └── ...               # Questionnaire, Summary screens
├── components/
│   ├── ProgressBar.tsx   # Progress visualization
└── services/
    ├── dataLoader.ts     # JSON data loader
```

---

## 🔍 **Verification**
1. **Test Flow**:
   - Select 3 health concerns → Drag to reorder.
   - Choose "Vegetarian" diet.
   - Add "Peanuts" allergy.
   - Complete lifestyle questionnaire.
2. **Expected Console Output**:
   ```json
   {
     "health_concerns": [{ "name": "Sleep", "priority": 1 }, ...],
     "diets": ["Vegetarian"],
     "allergies": ["Peanuts"],
     "sunExposure": "Yes"
   }
   ```

---

## 🛠️ **Technologies Used**
- **React Native**: Core framework
- **Recoil**: Global state management
- **React Navigation**: Screen transitions
- **TypeScript**: Type safety
- **react-native-draggable-flatlist**: Prioritization UI

---

## 🔮 **Future Roadmap**
1. Integrate step tracking for dynamic progress calculation.
2. Add unit tests for validation logic.
3. Implement API integration for vitamin recommendations.
```
