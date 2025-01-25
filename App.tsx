import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from './types/navigation';
import { WelcomeScreen } from './screens/welcome-screen';
import HealthConcernsScreen from './screens/health-concerns-screen';
import { RecoilRoot } from 'recoil';
import DietSelectionScreen from './screens/diet-selection-screen';
import AllergiesScreen from './screens/allergies-screen';
import QuestionnaireScreen from './screens/questionnaire-screen';
import SummaryScreen from './screens/summary-screen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F7FAFC' },
          }}
        >
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
          />
          <Stack.Screen
            name='HealthConcerns'
            component={HealthConcernsScreen}
          />
          <Stack.Screen
            name='DietSelection'
            component={DietSelectionScreen}
          />
          <Stack.Screen
            name='Allergies'
            component={AllergiesScreen}
          />
          <Stack.Screen
            name='Questionnaire'
            component={QuestionnaireScreen}
          />
          <Stack.Screen
            name='Summary'
            component={SummaryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
