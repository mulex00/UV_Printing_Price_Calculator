import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Setting from './src/screens/Setting';

//import CheckBox from 'react-native-btr';

const Stack = createNativeStackNavigator();

const App = () => {
  
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Setting" component={Setting}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;