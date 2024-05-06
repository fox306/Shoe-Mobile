import { View, Text, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Coupon as C } from '../types/type';
type Props = {
    item: C;
    type: string;
    setChooseCoupon: Dispatch<SetStateAction<C>>;
    setActive: Dispatch<SetStateAction<boolean>>;
};
const Coupon = ({ item, type, setChooseCoupon, setActive }: Props) => {
    const handleSet = () => {
        setChooseCoupon(item);
        setActive(false);
    };
    console.log(item);
    return (
        <>
            {type === 'Checkout' ? (
                <TouchableOpacity onPress={handleSet}>
                    <View className="p-5 bg-gray1 rounded-md mb-[10px]">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="font-semibold text-xl text-main">{item.name}</Text>
                            <Text className="text-base font-bold">{item.code}</Text>
                        </View>
                        {item.type === 'percent' && (
                            <View className="mt-2">
                                <Text className="text-base">Maximum discount : {item.maxDiscount}</Text>
                                <Text className="text-base">Minimum order : {item.minAmount}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            ) : (
                <View className="p-5 bg-white rounded-md">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="font-semibold text-xl text-main">{item.name}</Text>
                        <Text className="text-base font-bold">{item.code}</Text>
                    </View>
                    {item.type === 'percent' && (
                        <View className="mt-2">
                            <Text className="text-base">Maximum discount : {item.maxDiscount}</Text>
                            <Text className="text-base">Minimum order : {item.minAmount}</Text>
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

export default Coupon;
