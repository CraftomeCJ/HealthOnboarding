// screens/SummaryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { formState } from '../state/formState';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/progress-bar';

const SummaryScreen = () => {
  const form = useRecoilValue(formState);

  const progress = 1.0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Selections</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Concerns</Text>
          {form.prioritizedConcerns?.map((concern, index) => (
            <Text
              key={index}
              style={styles.itemText}
            >
              {index + 1}. {concern.name}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diets</Text>
          {form.diets?.map((diet, index) => (
            <Text
              key={index}
              style={styles.itemText}
            >
              - {diet}
            </Text>
          ))}
        </View>

        {(form?.allergies?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergies</Text>
            {form.allergies?.map((allergy, index) => (
              <Text
                key={index}
                style={styles.itemText}
              >
                - {allergy}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          <Text style={styles.itemText}>Sun Exposure: {form.sunExposure}</Text>
          <Text style={styles.itemText}>Smoking: {form.smoking}</Text>
          <Text style={styles.itemText}>Alcohol: {form.alcohol}</Text>
        </View>
      </ScrollView>
      <ProgressBar progress={progress} />
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
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4299E1',
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 8,
  },
});

export default SummaryScreen;
