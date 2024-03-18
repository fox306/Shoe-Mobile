import { View, Text, Image } from 'react-native';
import React from 'react';

const Order = ({ item }) => {
    return (
        <View className="p-[10px] bg-white rounded-[5px]">
            <View className="flex flex-row items-center gap-[10px] pb-[10px] border-b border-gray1">
                <Image
                    source={{ uri: item.image }}
                    style={{
                        width: 80,
                        height: 80,
                    }}
                    borderRadius={5}
                />
                <View>
                    <Text className="font-bold">{item.name}</Text>
                    <Text className="text-money">${item.price}</Text>
                    <View className="flex flex-row items-center gap-[30px]">
                        <Text className="text-xs">Size: {item.size}</Text>
                        <View className="flex flex-row items-center gap-1">
                            <Text className="text-xs">Color:</Text>
                            <View className="relative w-[10px] h-[10px] bg-[#FFBE00]">
                                <View className="absolute inset-[-4px] p-3 rounded-full border boder-[#FFBE00]"></View>
                            </View>
                        </View>
                        <Text className="text-xs">x{item.quantity}</Text>
                    </View>
                </View>
            </View>
            <View className="mt-[10px] w-full flex flex-row items-center justify-between">
                <Text className="text-xs text-main">Confirming</Text>
                <Text className="text-money">Total: ${item.total}</Text>
            </View>
        </View>
    );
};

export default Order;
