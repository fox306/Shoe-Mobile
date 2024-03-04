import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import CodeScreen from '../screens/CodeScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import Toast from 'react-native-toast-message';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
                <Stack.Screen name="Forgot" component={ForgotPassScreen}></Stack.Screen>
                <Stack.Screen name="Code" component={CodeScreen}></Stack.Screen>
                <Stack.Screen name="ChangePass" component={ChangePassScreen}></Stack.Screen>
                <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
                <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
                <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigation;
