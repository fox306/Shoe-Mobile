import { StyleSheet, Text, View, useWindowDimensions, Image as I } from 'react-native';
import React from 'react';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { OnboardingData } from '../data/data';
import LottieView from 'lottie-react-native';
import { Product } from '../types/type';

type Props = {
    index: number;
    x: SharedValue<number>;
    item: string;
};

const Image = ({ index, x, item }: Props) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const lottieAnimationStyle = useAnimatedStyle(() => {
        const translateYAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [200, 0, -200],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ translateY: translateYAnimation }],
        };
    });

    return (
        <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]} className="p-[10px]">
            <Animated.View style={lottieAnimationStyle}>
                <I source={{ uri: item }} style={[styles.image]} />
            </Animated.View>
            {/* <Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text> */}
        </View>
    );
};

export default Image;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        // padding: 10,
        width: 350,
        height: 350,
        borderRadius: 20,
    },
});
