import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import AddressItem from '../components/AddressItem';
import axios from '../utils/axios';
import { useRoute } from '@react-navigation/native';

type Params = {
    id: string;
};

const ListAddressScreen = () => {
    const route = useRoute();
    const { id } = route.params as Params;
    const [address, setAddress] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/deliveryAddress/user/${id}`);
            if (data.success) {
                setAddress(data.data);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView className="relative h-screen px-5">
                <View className="relative flex flex-row items-center justify-center mt-10 px-5">
                    <View className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </View>
                    <Text className="font-medium text-xl">Delivery Address</Text>
                </View>
                <View className="mt-7">{address && address.map((item, i) => <AddressItem key={i} item={item} />)}</View>
            </ScrollView>
            <View className="absolute bottom-0 right-2 mb-2">
                <TouchableOpacity>
                    <View className="w-full rounded-[30px] bg-main px-2">
                        <Text className="text-white text-xl font-bold tracking-widest">+ New Address</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ListAddressScreen;
