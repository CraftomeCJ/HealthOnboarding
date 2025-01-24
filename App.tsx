import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from './types/navigation';
import { WelcomeScreen } from './screens/welcome-screen';
import HealthConcernsScreen from './screens/health-concerns-screen';
import { RecoilRoot } from 'recoil';

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
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
