import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { formState } from '../state/formState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllergies } from '../services/dataLoader';
import { Allergy } from '../types/type';

const { width } = Dimensions.get('window');

type AllergiesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Allergies'>;
};

const AllergiesScreen: React.FC<AllergiesScreenProps> = ({ navigation }) => {
  const [form, setForm] = useRecoilState(formState);
  const [inputText, setInputText] = useState('');
  const selectedAllergies = form.allergies || [];

  const allergies = getAllergies();

  const handleAddAllergy = (allergy: Allergy) => {
    if (!selectedAllergies.includes(allergy.name)) {
      setForm({
        ...form,
        allergies: [...selectedAllergies, allergy.name],
      });
    }
  };

  const handleRemoveAllergy = (allergyName: string) => {
    setForm({
      ...form,
      allergies: selectedAllergies.filter((a) => a !== allergyName),
    });
  };

  const handleTextInput = (text: string) => {
    setInputText(text);
    if (text.endsWith(',') || text.endsWith(' ')) {
      const newAllergy = text.slice(0, -1).trim();
      if (newAllergy && !selectedAllergies.includes(newAllergy)) {
        setForm({
          ...form,
          allergies: [...selectedAllergies, newAllergy],
        });
        setInputText('');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Write any specific allergies or{'\n'}
          sensitivity towards specific{'\n'}
          things. (optional)
        </Text>

        {/* Horizontal Tags Container */}
        <View style={styles.tagsContainer}>
          <FlatList
            horizontal
            data={selectedAllergies}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tag}
                onPress={() => handleRemoveAllergy(item)}
              >
                <Text style={styles.tagText}>{item}</Text>
                <Text style={styles.removeIcon}>×</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.tagsContent}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder='Type or select allergies...'
          placeholderTextColor='#A0AEC0'
          value={inputText}
          onChangeText={handleTextInput}
        />

        {/* Allergy List */}
        <FlatList
          data={allergies.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.allergyItem,
                selectedAllergies.includes(item.name) && styles.selectedItem,
              ]}
              onPress={() =>
                selectedAllergies.includes(item.name)
                  ? handleRemoveAllergy(item.name)
                  : handleAddAllergy(item)
              }
            >
              <Text style={styles.allergyText}>{item.name}</Text>
              <Text style={styles.checkmark}>
                {selectedAllergies.includes(item.name) ? '✓' : '+'}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          style={styles.listContainer}
        />

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Questionnaire')}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'left',
    marginBottom: 32,
  },
  tagsContainer: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  tagsContent: {
    padding: 12,
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  tagText: {
    color: '#4299E1',
    fontSize: 14,
    marginRight: 6,
  },
  removeIcon: {
    color: '#4299E1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 20,
  },
  listContainer: {
    height: width * 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  listContent: {
    padding: 12,
  },
  allergyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#EBF8FF',
  },
  allergyText: {
    fontSize: 16,
    color: '#2D3748',
  },
  checkmark: {
    color: '#4299E1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  backButton: {
    padding: 16,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  nextButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FF5A5F',
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FF5A5F',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AllergiesScreen;
