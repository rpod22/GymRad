import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WelcomeScreen from './screens/WelcomeScreen';
import TrainingPlansScreen from './screens/TrainingPlansScreen';
import PlanDetailsScreen from './screens/PlanDetailsScreen';
import TrainingDetailsScreen from './screens/TrainingDetailsScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Push Pull Legs",
      trainings: [
        {id: 1, name: "Push", exercises: []},
        {id: 2, name: "Pull", exercises: []},
        {id: 3, name: "Legs", exercises: []},
      ]
    },
    {
      id: 2,
      name: "FBW",
      trainings: [
        {id: 1, name: "FBW 1", exercises: []},
        {id: 2, name: "FBW 2", exercises: []}
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
          <Stack.Screen name="TrainingDetails">
            {props => (
              <TrainingDetailsScreen
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

