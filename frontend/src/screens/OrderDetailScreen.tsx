import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { RadioButton } from 'react-native-paper';
import Address from '../components/Address';

const OrderDetailScreen = () => {
    const [order, setOrder] = useState([]);
    return (
        <SafeAreaView>
            <View className="relative h-screen p-10">
                <View className="relative mt-5 flex flex-row items-center justify-center">
                    <View className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </View>
                    <Text className="font-medium text-lg">Order Details</Text>
                </View>
                <View className="w-full flex flex-row items-center justify-between">
                    <Text className="font-medium text-base">Delivery Address</Text>
                    <Text className="text-main">Change</Text>
                </View>
                <View className="mt-[10px] mb-[20px]">
                    <Address />
                </View>
                <Text className="font-medium">Order Details</Text>
                <View className="mt-[10px] mb-5">
                    <FlatList data={order} renderItem={(item) => <CartItem />} showsVerticalScrollIndicator={false} />
                </View>
                <Text className="font-medium">Payment method</Text>
                <View className="px-[60px] py-[10px] bg-white rounded-[20px]">
                    <View className="flex flex-row items-center gap-[10px]">
                        <RadioButton value="" />
                        <Text className="text-lg">COD</Text>
                    </View>
                    <View className="flex flex-row items-center gap-[10px]">
                        <RadioButton value="" />
                        <Text className="text-lg">VNPay</Text>
                    </View>
                </View>
                <View className="my-[10px] w-full flex flex-row justify-between">
                    <Text className="text-lg">Status</Text>
                    <Text className="text-xl text-main">Success</Text>
                </View>
                <View className="mt-[10px] w-full flex flex-row justify-between">
                    <Text className="text-lg">Total</Text>
                    <Text className="text-xl text-money">#1111</Text>
                </View>
                <TouchableOpacity>
                    <View className="absolute bottom-0 w-full bg-main rounded-[30px]">
                        <Text className="font-bold text-xl text-white tracking-widest">Return</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;
