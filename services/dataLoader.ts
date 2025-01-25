import healthConcernsData from '../assets/health-concern.json';
import dietsData from '../assets/Diets.json';
import { Diet } from '../types/type';
import allergiesData from '../assets/allergies.json';

export const getHealthConcerns = () => healthConcernsData;
export const getDiets = (): Diet[] => [
  {
    id: 0,
    name: 'None',
    tool_tip: 'No specific dietary restrictions or preferences'
  },
  ...dietsData.data.map(data => ({
    ...data,
    // Correct typos from JSON
    name: data.name === 'Vegaterian' ? 'Vegetarian' : data.name
  }))
];

export const getAllergies = () => allergiesData