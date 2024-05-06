import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import Order from '../components/Order';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import Navbar from '../components/Navbar';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { ItemCart, Order as O } from '../types/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Comments from '../components/Comments';
import Loading from '../components/Loading';

type Params = {
    id: string;
};

const OrdersScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const statuses = ['Confirming', 'Accepted', 'Delivering', 'Successful', 'Cancel', 'Return', 'All'];
    const route = useRoute();

    const { id } = route.params as Params;

    const [active, setActive] = useState('Confirming');
    const [orders, setOrders] = useState<O[]>([]);
    const [product, setProduct] = useState<ItemCart>();
    const [form, setForm] = useState(false);

    const handlePressOutside = () => {
        setForm(false);
    };
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handlePressOutside);

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (active === 'All') {
            const fetchData = async () => {
                const { data } = await axios.get(`/orders/find/by-user?pageSize=10&pageNumber=1&user=${id}`);
                if (data.success) {
                    setOrders(data.data);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const { data } = await axios.get(
                    `/orders/find/by-user-status?pageSize=10&pageNumber=1&user=${id}&status=${active}`,
                );
                if (data.success) {
                    console.log(data.data);
                    setOrders(data.data);
                }
            };
            fetchData();
        }
    }, [active]);
    console.log(product);
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
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
                    {orders.length === 0 ? (
                        <View className="mt-[50px] h-[50px]">
                            <Loading name="Order" />
                        </View>
                    ) : (
                        <View className="mt-[10px]">
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={orders}
                                renderItem={({ item }) => (
                                    <Order
                                        item={item}
                                        setForm={setForm}
                                        setProduct={setProduct as Dispatch<SetStateAction<ItemCart>>}
                                    />
                                )}
                            />
                        </View>
                    )}

                    <Navbar name="Orders" load />
                    {form && <Comments setForm={setForm} user={id} product={product as ItemCart} />}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default OrdersScreen;
