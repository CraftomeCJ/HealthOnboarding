// screens/DietSelectionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { formState } from '../state/formState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDiets } from '../services/dataLoader';
import { Diet } from '../types/type';

type DietSelectionScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DietSelection'>;
};

const DietSelectionScreen: React.FC<DietSelectionScreenProps> = ({ navigation }) => {
  const [form, setForm] = useRecoilState(formState);
  const selectedDiets = form.diets || [];
  const diets = getDiets();

  const toggleDiet = (diet: Diet) => {
    let newDiets = [...selectedDiets];

    if (diet.name === 'None') {
      newDiets = ['None'];
    } else {
      newDiets = newDiets.filter(d => d !== 'None');
      newDiets = newDiets.includes(diet.name)
        ? newDiets.filter(d => d !== diet.name)
        : [...newDiets, diet.name];
    }

    setForm({ ...form, diets: newDiets });
  };

  const showTooltip = (diet: Diet) => {
    Alert.alert(diet.name, diet.tool_tip);
  };

  const handleNext = () => {
    if (selectedDiets.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one diet');
      return;
    }
    navigation.navigate('Allergies');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select the diets you follow<Text style={styles.required}>*</Text></Text>

        {diets.map((diet) => (
          <View key={diet.id} style={styles.dietContainer}>
            <TouchableOpacity
              style={[
                styles.dietButton,
                selectedDiets.includes(diet.name) && styles.selectedDietButton
              ]}
              onPress={() => toggleDiet(diet)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  selectedDiets.includes(diet.name) && styles.checkedBox
                ]}>
                  {selectedDiets.includes(diet.name) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </View>
              <Text style={styles.dietText}>{diet.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoIcon}
              onPress={() => showTooltip(diet)}
            >
              <Text style={styles.infoText}>i</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6FAF3',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#2D3748',
  },
  required: {
    color: '#e53e3e',
  },
  dietContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  dietButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedDietButton: {
    backgroundColor: '#EBF8FF',
  },
  checkboxContainer: {
    marginRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dietText: {
    fontSize: 16,
    color: '#2D3748',
  },
  infoIcon: {
    padding: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  infoText: {
    color: '#4299E1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  backButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    width: '45%',
    alignItems: 'center',
  },
  nextButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#4299E1',
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DietSelectionScreen;