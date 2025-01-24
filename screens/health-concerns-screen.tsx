// screens/HealthConcernsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoilState } from 'recoil';
import { formState } from '../state/formState';
import healthConcerns from '../assets/health-concern.json';
import { HealthConcern } from '../types/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HealthConcernsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HealthConcerns'>;
};

const HealthConcernsScreen: React.FC<HealthConcernsScreenProps> = ({ navigation }) => {
  const [form, setForm] = useRecoilState(formState);
  const selected = form.selectedConcerns || [];

  // Toggle health concern selection
  const toggleSelection = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter(item => item !== id)
      : [...selected, id].slice(0, 5);

    setForm({
      ...form,
      selectedConcerns: newSelected,
      prioritizedConcerns: newSelected // Reset order when changing selection
    });
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = ({ data }: {data: HealthConcern[]}) => {
    setForm({ ...form, prioritizedConcerns: data });
  };

  // Get selected items with names
  const selectedItems = healthConcerns.data
    .filter(item => selected.includes(item.id))
    .map(item => ({ id: item.id, name: item.name }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Selection Section */}
      <Text style={styles.sectionTitle}>Select Top Health Concerns (max 5)</Text>
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
              selected.length >= 5 && !selected.includes(item.id) && styles.disabledButton
            ]}
            onPress={() => toggleSelection(item.id)}
            disabled={selected.length >= 5 && !selected.includes(item.id)}
          >
            <Text style={styles.buttonText}>{item.name}</Text>
            {selected.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        )}
      />

      {/* Prioritization Section */}
      {selected.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Prioritize Your Selection</Text>
          <DraggableFlatList
            data={selectedItems}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
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

      <View style={styles.footer}>
        <Text style={styles.counter}>Selected: {selected.length}/5</Text>
        <Button
          title="Continue"
          onPress={() => {
            console.log('Prioritized Order:', form.prioritizedConcerns);
            navigation.navigate('DietSelection');
          }}
          disabled={selected.length === 0}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#2d3748'
  },
  grid: {
    gap: 12,
  },
  selectionButton: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#ebf8ff',
    borderColor: '#4299e1'
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#f7fafc'
  },
  buttonText: {
    fontSize: 16,
    color: '#2d3748'
  },
  checkmark: {
    color: '#4299e1',
    fontWeight: 'bold',
    fontSize: 18
  },
  dragList: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  draggableItem: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  dragText: {
    fontSize: 16,
    color: '#2d3748'
  },
  dragHandle: {
    color: '#a0aec0',
    fontSize: 20,
    paddingHorizontal: 8
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  counter: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#718096'
  }
});

export default HealthConcernsScreen;