// screens/HealthConcernsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoilState } from 'recoil';
import { formState } from '../state/formState';
import { HealthConcern } from '../types/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHealthConcerns } from '../services/dataLoader';

type HealthConcernsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HealthConcerns'>;
};

const HealthConcernsScreen: React.FC<HealthConcernsScreenProps> = ({ navigation }) => {
  const [form, setForm] = useRecoilState(formState);
  const healthConcerns = getHealthConcerns();

  const selected = form.selectedConcerns || [];
  const prioritizedConcerns = form.prioritizedConcerns || [];

  // Toggle health concern selection
  const toggleSelection = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id].slice(0, 5);

    const newPrioritized = healthConcerns.data.filter((item) => newSelected.includes(item.id));

    setForm({
      ...form,
      selectedConcerns: newSelected,
      prioritizedConcerns: newPrioritized,
    });
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = ({ data }: { data: HealthConcern[] }) => {
    // Delay Recoil update to prevent flickering issue
    setTimeout(() => {
      setForm((prevForm) => ({
        ...prevForm,
        prioritizedConcerns: data,
      }));
    }, 100);
  };

  const handleNext = () => {
    console.log(
      'Final Prioritized Order:',
      prioritizedConcerns.map((item) => item.name)
    );
    navigation.navigate('DietSelection');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Selection Section */}
        <Text style={styles.sectionTitle}>
          Select the top health concerns <Text style={styles.required}>*</Text> {'\n'}(up to 5)
        </Text>
        <FlatList
          data={healthConcerns.data}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.selectionButton,
                selected.includes(item.id) && styles.selectedButton,
                selected.length >= 5 && !selected.includes(item.id) && styles.disabledButton,
              ]}
              onPress={() => toggleSelection(item.id)}
              disabled={selected.length >= 5 && !selected.includes(item.id)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Prioritization Section */}
        {selected.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Prioritize</Text>
            <DraggableFlatList
              data={prioritizedConcerns}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              onDragEnd={handleDragEnd}
              contentContainerStyle={styles.dragList}
              renderItem={({ item, drag }) => (
                <TouchableOpacity
                  style={styles.draggableItem}
                  onPressIn={drag}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dragText}>{item.name}</Text>
                  <Text style={styles.dragHandle}>☰</Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {/* Navigation Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, selected.length === 0 && styles.disabledNextButton]}
            onPress={handleNext}
            disabled={selected.length === 0}
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
    backgroundColor: '#e6faf3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2d3748',
  },
  required: {
    color: '#e53e3e',
  },
  grid: {
    gap: 12,
  },
  selectionButton: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#4299e1',
    borderColor: '#2b6cb0',
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#f7fafc',
  },
  buttonText: {
    fontSize: 14,
    color: '#2d3748',
  },
  dragList: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  draggableItem: {
    padding: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderRadius: 10,
    marginVertical: 4,
  },
  dragText: {
    fontSize: 16,
    color: '#2d3748',
  },
  dragHandle: {
    color: '#718096',
    fontSize: 20,
    paddingHorizontal: 8,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '45%',
  },
  nextButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    width: '45%',
  },
  disabledNextButton: {
    backgroundColor: '#A0AEC0',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthConcernsScreen;
