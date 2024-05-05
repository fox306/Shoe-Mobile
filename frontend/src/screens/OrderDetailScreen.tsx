import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { RadioButton } from 'react-native-paper';
import Address from '../components/Address';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import axios from '../utils/axios';
import { Address as A, Order } from '../types/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
type Params = {
    id: string;
    user: string;
};
const unProps = {
    onCheckedItem: () => {},
    onRemoveItem: () => {},
};

const OrderDetailScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute();
    const { id, user } = route.params as Params;
    const [order, setOrder] = useState<Order>();
    const [address, setAddress] = useState<A>();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/orders/${id}`);
            if (data.success) {
                setOrder(data.data);
            }
        };
        const fetchAddress = async () => {
            const { data } = await axios.get(`/deliveryAddress/user/${user}/default`);
            if (data.success) {
                setAddress(data.data);
            } else setAddress(undefined);
        };
        fetchData();
        fetchAddress();
    }, []);
    console.log(user);
    const handleOrder = async () => {
        const { data } = await axios.patch(`/orders/return/${id}`);
        if (data.success) {
            navigation.goBack();
            Toast.show({ type: 'success', text1: 'Return success' });
        }
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="relative h-screen flex flex-col items-center">
                    <View className="px-10 flex flex-col items-center w-full">
                        <View className="relative flex flex-row items-center justify-center mb-[30px] w-full">
                            <TouchableOpacity className="absolute left-0" onPress={() => navigation.goBack()}>
                                <ArrowLeftIcon size={24} color={'#000000'} />
                            </TouchableOpacity>
                            <Text className="font-medium text-lg">Checkout</Text>
                        </View>
                        <View className="w-full flex flex-row items-center justify-between">
                            <Text className="font-medium text-base">Delivery Address</Text>
                            <Text className="text-main">Change</Text>
                        </View>
                        {address && (
                            <View className="mt-[10px] mb-[20px]">
                                <Address data={address} />
                            </View>
                        )}
                        <Text className="font-medium w-full">Order Details</Text>
                        <View className="mt-[10px] h-[240px]">
                            <FlatList
                                data={order?.items}
                                renderItem={({ item }) => <CartItem data={item} {...unProps} type="Checkout" />}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                            />
                        </View>
                    </View>
                    <View className="absolute bottom-0 w-full px-10 flex justify-end">
                        <View className="flex flex-col items-center justify-center">
                            <Text className="w-full font-medium">Payment method</Text>
                            <View className="py-[10px] bg-white rounded-[20px] w-full flex flex-row items-center justify-around">
                                <View className="flex flex-row items-center ">
                                    <RadioButton
                                        value="COD"
                                        disabled
                                        status={order?.paymentMethod === 'COD' ? 'checked' : 'unchecked'}
                                    />
                                    <Text className="text-lg ml-[10px]">COD</Text>
                                </View>
                                <View className="flex flex-row items-center ">
                                    <RadioButton
                                        value="VNPAY"
                                        disabled
                                        status={order?.paymentMethod === 'VNPAY' ? 'checked' : 'unchecked'}
                                    />
                                    <Text className="text-lg ml-[10px]">VNPay</Text>
                                </View>
                            </View>
                            <View className="mt-9 w-full flex flex-row justify-between mb-5">
                                <Text className="text-lg">Total</Text>
                                <Text className="text-xl text-money">#{order?.total}</Text>
                            </View>
                            <TouchableOpacity
                                className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center mb-5"
                                onPress={handleOrder}
                            >
                                <Text className="font-bold text-xl text-white tracking-widest">Return</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;
