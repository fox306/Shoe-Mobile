import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import Order from '../components/Order';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import Navbar from '../components/Navbar';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { Order as O } from '../types/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Params = {
    user: string;
};

const OrdersScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const statuses = ['All', 'Confirming', 'Accepted', 'Delivering', 'Successful', 'Cancel', 'Return'];
    const route = useRoute();

    const { user } = route.params as Params;

    const [active, setActive] = useState('All');
    const [orders, setOrders] = useState<O[]>([]);

    useEffect(() => {
        if (active === 'All') {
            const fetchData = async () => {
                const { data } = await axios.get(`/orders/user/?user=${user}&pageSize=10`);
                if (data.success) {
                    setOrders(data.data);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const { data } = await axios.get(
                    `/orders/user/status?status=${active}&pageSize=5&pageNumber=1&user=${user}`,
                );
                if (data.success) {
                    console.log(data.data);
                    setOrders(data.data);
                }
            };
            fetchData();
        }
    }, [active]);
    console.log(orders);
    return (
        <SafeAreaView>
            <View className="relative px-5 h-screen">
                <View className="relative mt-10 mb-7 flex flex-row items-center justify-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </TouchableOpacity>
                    <Text className="font-medium text-lg">Orders</Text>
                </View>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: 20 }}
                        data={statuses}
                        keyExtractor={(item, idx) => item + idx}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setActive(item)}>
                                <View
                                    className={`w-[100px] h-7 ${active === item ? 'border-main border-b' : ''}`}
                                    key={item}
                                >
                                    <Text
                                        className={`${
                                            active === item ? 'text-main' : 'text-gray1'
                                        } text-center text-base`}
                                    >
                                        {item}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View className="mt-[10px]">
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={({ item }) => <Order item={item} />}
                    />
                </View>
                <Navbar name="Orders" />
            </View>
        </SafeAreaView>
    );
};

export default OrdersScreen;
