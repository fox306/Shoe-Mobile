import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ItemCart, Order as O } from '../types/type';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type Props = {
    item: O;
    setForm: Dispatch<SetStateAction<boolean>>;
    setProduct: Dispatch<SetStateAction<ItemCart>>;
};

const Order = ({ item, setForm, setProduct }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const handleClick = (item: ItemCart) => {
        setForm(true);
        setProduct(item);
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { id: item._id, user: item.user })}>
            <View className="p-[10px] bg-white rounded-[5px] mb-[10px]">
                {item.items &&
                    item.items.map((order, i) => (
                        <View
                            className={`flex flex-row items-center gap-[10px] pb-[10px] border-b border-gray1 ${
                                i >= 1 ? 'mt-[10px] ' : 'mt-[5px]'
                            }`}
                        >
                            <Image
                                source={{ uri: order.image }}
                                style={{
                                    width: 80,
                                    height: 80,
                                }}
                                borderRadius={5}
                            />
                            <View>
                                <Text className="font-bold">{order.name}</Text>
                                <Text className="text-money mt-[8px] mb-[22px]">${order.price}</Text>
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="text-xs">Size: {order.size}</Text>
                                    <View className="flex flex-row items-center mx-[15px]">
                                        <Text className="text-xs">Color:</Text>
                                        <View
                                            className={`relative w-[10px] h-[10px] bg-[${order.hex.toString()}] rounded-full ml-[5px]`}
                                        >
                                            <View className="absolute left-[-2px] top-[-2px] p-[5px] rounded-full border-2 border-gray1"></View>
                                        </View>
                                    </View>
                                    <Text className="text-xs mr-1">x{order.quantity}</Text>
                                    {item.status === 'Successful' && (
                                        <TouchableOpacity onPress={() => handleClick(order)}>
                                            <View className="w-[80px] h-8 bg-main rounded-2xl flex items-center justify-center">
                                                <Text className="text-xs text-white">Review</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                <View className="mt-[10px] w-full flex flex-row items-center justify-between">
                    <Text className="text-xs text-main">{item.status}</Text>
                    <Text className="text-money">Total: ${item.total}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Order;
