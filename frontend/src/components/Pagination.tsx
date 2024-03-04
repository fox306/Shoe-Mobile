import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';
import { Product } from '../types/type';

type Props = {
    item: string[];
    x: SharedValue<number>;
};
const Pagination = ({ item, x }: Props) => {
    return (
        <View style={styles.paginationContainer}>
            {item.map((_, index) => {
                return <Dot index={index} x={x} key={index} />;
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
