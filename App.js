// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUpScreen/SingUp';
import Home from './screens/HomeScreen/Home';
import Login from './screens/LoginScreen/Login';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShopScreen from './screens/shopScreen/ShopScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen  options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen  options={{headerShown: false}} name="Profile" component={ProfileScreen} />
      <Stack.Screen  options={{headerShown: false}} name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
