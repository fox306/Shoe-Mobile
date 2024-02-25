import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const WelcomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        setTimeout(() => navigation.navigate('Home'), 2500);
    }, []);
    return (
        <View className="flex-1 justify-center items-center bg-main">
            <Text>Sneakers for Everyone</Text>
        </View>
    );
};

export default WelcomeScreen;
