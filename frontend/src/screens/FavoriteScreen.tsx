import { View, Text } from 'react-native';
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

const FavoriteScreen = () => {
    const [items, setItems] = useState<P[]>([]);

    useEffect(() => {
        try {
            const fetchItem = async () => {
                const { data } = await axios.get(`/products/`);
                if (data.success) {
                    setItems(data.data);
                }
                console.log(data);
            };
            fetchItem();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <SafeAreaView>
            <View className="relative pt-[60px] px-[10px]">
                <View className="relative px-[30px] flex flex-row items-center justify-center">
                    <View className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </View>
                    <Text className="font-medium textlg">Favorites</Text>
                </View>
                <View className="mt-5">
                    {items.length === 0 ? (
                        // <View className="flex flex-col items-center justify-center">
                        //     <MagnifyingGlassIcon color="#C7C7C7" width={122} height={122} />
                        //     <Text className="font-medium text-3xl">Shoes not found</Text>
                        //     <Text className="font-base opacity-70">
                        //         Try searching the item with a different keyword.
                        //     </Text>
                        // </View>
                        <Loading />
                    ) : (
                        <MasonryList
                            data={items}
                            keyExtractor={(item): string => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View className="mb-[40px]">
                                    <Product name="Search" item={item as P} />
                                </View>
                            )}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                            contentContainerStyle={{ paddingBottom: 30 }}
                            // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )}
                </View>
                <Navbar name="Favorites" />
            </View>
        </SafeAreaView>
    );
};

export default FavoriteScreen;
