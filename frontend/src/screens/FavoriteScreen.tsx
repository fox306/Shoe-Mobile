import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import MasonryList from '@react-native-seoul/masonry-list';
import { Product as P } from '../types/type';
import Product from '../components/Product';
import Loading from '../components/Loading';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import Navbar from '../components/Navbar';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Params = {
    id: string;
};

const FavoriteScreen = () => {
    const route = useRoute();
    const { id } = route.params as Params;
    const [items, setItems] = useState<P[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        try {
            const fetchItem = async () => {
                const { data } = await axios.get(`/products/find/by-favorites?pageSize=10&user=${id}`);
                if (data.success) {
                    setItems(data.data);
                }
                console.log(data);
            };
            fetchItem();
        } catch (error) {
            console.log(error);
        }
    }, [load]);
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} className="relative h-screen px-5">
                <View className="relative mt-10 px-5 flex flex-row items-center justify-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </TouchableOpacity>
                    <Text className="font-medium text-lg">Favorites</Text>
                </View>
                <View className="mt-10">
                    {items.length === 0 ? (
                        // <View className="flex flex-col items-center justify-center">
                        //     <MagnifyingGlassIcon color="#C7C7C7" width={122} height={122} />
                        //     <Text className="font-medium text-3xl">Shoes not found</Text>
                        //     <Text className="font-base opacity-70">
                        //         Try searching the item with a different keyword.
                        //     </Text>
                        // </View>
                        <Loading name="Favorite" />
                    ) : (
                        <MasonryList
                            data={items}
                            keyExtractor={(item): string => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingTop: 20 }}
                            renderItem={({ item }) => (
                                <View className="mb-[40px]">
                                    <Product name="Search" item={item as P} user={id} setLoad={setLoad} load={load} />
                                </View>
                            )}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                            // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )}
                </View>
            </ScrollView>
            <Navbar name="Favorites" />
        </SafeAreaView>
    );
};

export default FavoriteScreen;
