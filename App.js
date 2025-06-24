import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WelcomeScreen from './screens/WelcomeScreen';
import TrainingPlansScreen from './screens/TrainingPlansScreen';
import PlanDetailsScreen from './screens/PlanDetailsScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Push Pull Legs",
      trainings: [
        {id: 1, name: "Push"},
        {id: 2, name: "Pull"},
        {id: 3, name: "Legs"},
      ]
    },
    {
      id: 2,
      name: "FBW",
      trainings: [
        {id: 1, name: "FBW 1"},
        {id: 2, name: "FBW 2"}
      ]
    },
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TrainingPlans">
            {props => (
              <TrainingPlansScreen 
                {...props}
                plans={plans}
                setPlans={setPlans}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="PlanDetails">
            {props => (
              <PlanDetailsScreen
                {...props}
                plans={plans}
                setPlans={setPlans}
              />
            )}
          </Stack.Screen>  
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

