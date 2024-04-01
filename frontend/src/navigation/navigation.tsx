import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import CodeScreen from '../screens/CodeScreen';
import RecoveryPasswordScreen from '../screens/RecoveryPasswordScreen';
import Toast from 'react-native-toast-message';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeProfileScreen from '../screens/ChangeProfileScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ListAddressScreen from '../screens/ListAddressScreen';
import ManageAddressScreen from '../screens/ManageAddressScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
// import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import CouponScreen from '../screens/CouponScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    // const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //         return true;
    //     }
    // };
    // useEffect(() => {
    //     const initializeMessaging = async () => {
    //         const permissionGranted = await requestUserPermission();
    //         if (permissionGranted) {
    //             messaging()
    //                 .getToken()
    //                 .then((token) => console.log(token));
    //         } else {
    //             console.log('Permission not granted');
    //         }
    //     };
    //     initializeMessaging();
    //     //getInitialNotification: When the application is opened from a quit state.
    //     messaging()
    //         .getInitialNotification()
    //         .then(async (remoteMessage) => {
    //             if (remoteMessage) {
    //                 console.log('Notifiii in quit state', remoteMessage.notification);
    //             }
    //         });

    //     //onNotificationOpenedApp: When the application is running, but in the background.
    //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //         console.log('Notifii in bg state', remoteMessage.notification);
    //     });

    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });

    //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
                <Stack.Screen name="Forgot" component={ForgotPassScreen}></Stack.Screen>
                <Stack.Screen name="Code" component={CodeScreen}></Stack.Screen>
                <Stack.Screen name="Recovery" component={RecoveryPasswordScreen}></Stack.Screen>
                <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
                <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
                <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
                <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}></Stack.Screen>
                <Stack.Screen name="ChangeProfile" component={ChangeProfileScreen}></Stack.Screen>
                <Stack.Screen name="Checkout" component={CheckoutScreen}></Stack.Screen>
                <Stack.Screen name="Favorite" component={FavoriteScreen}></Stack.Screen>
                <Stack.Screen name="ListAddress" component={ListAddressScreen}></Stack.Screen>
                <Stack.Screen name="ManageAddress" component={ManageAddressScreen}></Stack.Screen>
                <Stack.Screen name="Order" component={OrdersScreen}></Stack.Screen>
                <Stack.Screen name="OrderDetail" component={OrderDetailScreen}></Stack.Screen>
                <Stack.Screen name="Coupon" component={CouponScreen}></Stack.Screen>
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigation;
