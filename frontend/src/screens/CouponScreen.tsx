import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import MasonryList from '@react-native-seoul/masonry-list';
import Coupon from '../components/Coupon';
import { Coupon as C } from '../types/type';
import axios from '../utils/axios';

type Params = {
    id: string;
};

const unProps = {
    setActive: () => {},
    setChooseCoupon: () => {},
};

const CouponScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute();
    const { id } = route.params as Params;
    const [items, setItems] = useState<C[]>();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/coupons/find/by-user?user=${id}`);
            if (data.success) {
                setItems(data.data);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} className="relative h-screen px-5">
                <View className="relative mt-10 px-5 flex flex-row items-center justify-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </TouchableOpacity>
                    <Text className="font-medium text-lg">Coupons</Text>
                </View>
                <View className="mt-10">
                    {items?.length === 0 ? (
                        // <View className="flex flex-col items-center justify-center">
                        //     <MagnifyingGlassIcon color="#C7C7C7" width={122} height={122} />
                        //     <Text className="font-medium text-3xl">Shoes not found</Text>
                        //     <Text className="font-base opacity-70">
                        //         Try searching the item with a different keyword.
                        //     </Text>
                        // </View>
                        <Loading name="Coupon" />
                    ) : (
                        items && (
                            <MasonryList
                                data={items}
                                keyExtractor={(item): string => item.id}
                                numColumns={1}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingTop: 20 }}
                                renderItem={({ item }) => (
                                    <View className="mb-[40px]">
                                        <Coupon item={item as C} type="ShowCoupon" {...unProps} />
                                    </View>
                                )}
                                // refreshing={isLoadingNext}
                                // onRefresh={() => refetch({ first: ITEM_CNT })}
                                onEndReachedThreshold={0.1}
                                // onEndReached={() => loadNext(ITEM_CNT)}
                            />
                        )
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CouponScreen;
