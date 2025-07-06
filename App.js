import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import TrainingPlansScreen from './screens/TrainingPlansScreen';
import PlanDetailsScreen from './screens/PlanDetailsScreen';
import TrainingDetailsScreen from './screens/TrainingDetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {

  const [plans, setPlans] = useState(null);

  useEffect(() => {
    //loading saved plans when starting the app if they exist
    const loadPlans = async () => {
      try {
        const savedPlans = await AsyncStorage.getItem('plans');
        if(savedPlans) {
          setPlans(JSON.parse(savedPlans));
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.log('Error while loading plans', err);
        setPlans([]); //fallback
      }
    };

    loadPlans();
  }, []);

  useEffect(() => {
    if(plans !== null) {
      AsyncStorage.setItem('plans', JSON.stringify(plans));
    }
  }, [plans]);

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

