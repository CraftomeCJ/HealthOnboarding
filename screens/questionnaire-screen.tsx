// screens/QuestionnaireScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { formState } from '../state/formState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import allergiesData from '../assets/allergies.json';

type QuestionnaireScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Questionnaire'>;
};

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ navigation }) => {
  const [form, setForm] = useRecoilState(formState);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.sunExposure || !form.smoking || !form.alcohol) {
      setValidationError('Please answer all questions before proceeding.');
      return;
    }

    const finalOutput = {
      health_concerns: form.prioritizedConcerns?.map((concern, index) => ({
        id: concern.id,
        name: concern.name,
        priority: index + 1,
      })),
      diets: form.diets,
      is_daily_exposure: form.sunExposure === 'Yes',
      is_smoke: form.smoking === 'Yes',
      alcohol: form.alcohol,
      allergies: form.allergies
        ? form.allergies.map((allergy) => ({
            id: allergiesData.data.find((a) => a.name === allergy)?.id,
            name: allergy,
          }))
        : [],
    };

    setValidationError(null);
    console.log('Final Selections:', JSON.stringify(finalOutput, null, 2));
    navigation.navigate('Summary');
  };

  const RadioButton = ({
    label,
    selected,
    onPress
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={onPress}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionRow = ({ question, options, stateKey }: {
    question: string;
    options: string[];
    stateKey: keyof typeof form;
  }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <RadioButton
            key={option}
            label={option}
            selected={form[stateKey] === option}
            onPress={() => setForm({ ...form, [stateKey]: option })}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <QuestionRow
          question="Is your daily exposure to sun limited?"
          options={['Yes', 'No']}
          stateKey="sunExposure"
        />

        <QuestionRow
          question="Do you currently smoke (tobacco or marijuana)?"
          options={['Yes', 'No']}
          stateKey="smoking"
        />

        <QuestionRow
          question="On average, how many alcoholic beverages do you have in a week?"
          options={['0-1', '2-5', '5+']}
          stateKey="alcohol"
        />

        {validationError && (
          <Text style={styles.errorText}>{validationError}</Text>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Get my personalized vitamin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6FAF3',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4299E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4299E1',
  },
  radioLabel: {
    fontSize: 16,
    color: '#2D3748',
  },
  submitButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default QuestionnaireScreen;
