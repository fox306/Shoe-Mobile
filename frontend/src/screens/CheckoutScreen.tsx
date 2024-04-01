import { View, Text, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { RadioButton } from 'react-native-paper';
import Address from '../components/Address';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { Address as A, Coupon as C, ItemCart } from '../types/type';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MasonryList from '@react-native-seoul/masonry-list';
import Coupon from '../components/Coupon';

const unProps = {
    onCheckedItem: () => {},
    onRemoveItem: () => {},
};

type Params = {
    data: ItemCart[];
    user: string;
    total: number;
};

const CheckoutScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [address, setAddress] = useState<A>();
    const route = useRoute();
    const [pay, setPay] = useState('COD');
    const { data, user, total } = route.params as Params;
    const [items, setItems] = useState<C[]>();
    const [money, setMoney] = useState(total);
    const [active, setActive] = useState(false);
    const [chooseCoupon, setChooseCoupon] = useState<C>();

    const handlePressOutside = () => {
        setActive(false);
    };
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handlePressOutside);

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/deliveryAddress/user/${user}/default`);
            if (data.success) {
                setAddress(data.data);
            } else setAddress(undefined);
        };
        const fetchCoupon = async () => {
            const { data } = await axios.get(`/coupons/find/by-user?user=${user}`);
            if (data.success) {
                setItems(data.data);
            }
        };
        fetchData();
        fetchCoupon();
    }, []);

    useEffect(() => {
        if (chooseCoupon) {
            if (chooseCoupon?.type === 'percent') {
                const moneyReduce = (money * chooseCoupon.value) / 100;
                setMoney(money - moneyReduce);
            } else setMoney(money - chooseCoupon.value);
        }
    }, [chooseCoupon]);

    const handleOrder = async () => {
        const itemCart = data.map((item) => {
            const { selected, ...itemCart } = item;
            return itemCart;
        });
        if (!address) {
            Toast.show({
                type: 'error',
                text1: 'Please Create Address',
            });
            navigation.navigate('ManageAddress');
        } else {
            const { data } = await axios.post('/orders', {
                user: user,
                deliveryAddress: address._id,
                items: itemCart,
                paymentMethod: pay,
                total: money,
                coupon: chooseCoupon?._id,
            });
            if (data.success) {
                Toast.show({ type: 'success', text1: 'Order Success' });
                navigation.replace('Order', { id: user });
            }
        }
    };
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} className="relative h-screen">
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View className="flex h-[850px] flex-col items-center">
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

                            <View className="mt-[10px] w-full h-[200px]">
                                <MasonryList
                                    data={data}
                                    keyExtractor={(item): string => item.id}
                                    numColumns={1}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <CartItem data={item as ItemCart} {...unProps} type="Checkout" />
                                    )}
                                    onEndReachedThreshold={0.1}
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
                                            status={pay === 'COD' ? 'checked' : 'unchecked'}
                                            onPress={() => setPay('COD')}
                                        />
                                        <Text className="text-lg ml-[10px]">COD</Text>
                                    </View>
                                    <View className="flex flex-row items-center ">
                                        <RadioButton
                                            value="VNPAY"
                                            status={pay === 'VNPAY' ? 'checked' : 'unchecked'}
                                            onPress={() => setPay('VNPAY')}
                                        />
                                        <Text className="text-lg ml-[10px]">VNPay</Text>
                                    </View>
                                </View>
                                <View className="w-full mt-2">
                                    <View className="flex flex-row items-center justify-between">
                                        <Text>Choose Coupon</Text>
                                        <TouchableOpacity onPress={() => setActive(true)}>
                                            <View className="px-2 py-2 bg-main flex items-center justify-center rounded-xl">
                                                <Text className="text-white">Choose</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="font-semibold text-lg text-center">{chooseCoupon?.name}</Text>
                                </View>
                                <View className="mt-9 w-full flex flex-row justify-between mb-5">
                                    <Text className="text-lg">Total</Text>
                                    <Text className="text-xl text-money">${money}</Text>
                                </View>
                                <TouchableOpacity
                                    className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center mb-5"
                                    onPress={handleOrder}
                                >
                                    <Text className="font-bold text-xl text-white tracking-widest">Order Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {active && (
                            <View className="bg-white fixed w-full h-[350px]">
                                {items && (
                                    <MasonryList
                                        data={items}
                                        keyExtractor={(item): string => item.id}
                                        numColumns={1}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingTop: 20 }}
                                        renderItem={({ item }) => (
                                            <View>
                                                <Coupon
                                                    item={item as C}
                                                    type="Checkout"
                                                    setChooseCoupon={setChooseCoupon as Dispatch<SetStateAction<C>>}
                                                    setActive={setActive}
                                                />
                                            </View>
                                        )}
                                        // refreshing={isLoadingNext}
                                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                                        onEndReachedThreshold={0.1}
                                        // onEndReached={() => loadNext(ITEM_CNT)}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckoutScreen;
