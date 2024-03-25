import {
    StyleSheet,
    View,
    FlatList,
    ViewToken,
    Text,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef } from 'react-native-reanimated';
import data, { OnboardingData } from '../data/data';
import Pagination from '../components/Pagination';
import Image from '../components/Image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Rating } from '@mui/material';
import Review from '../components/Review';
import ProductInfo from '../components/ProductInfo';
import { HeartIcon } from 'react-native-heroicons/outline';
import { Product, RVariant, User, Variant } from '../types/type';
import axios from '../utils/axios';
import { useRoute } from '@react-navigation/native';
import Comfirm from '../components/Comfirm';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
    id: string;
};

const DetailScreen = () => {
    const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0].index !== null) {
            flatListIndex.value = viewableItems[0].index;
        }
    };

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    const route = useRoute();
    const { id } = route.params as RouteParams;

    const [item, setItem] = useState<Product>();
    const [rVariant, setRVariant] = useState<RVariant>();
    const [listVariant, setListVariant] = useState<Variant>();
    const [active, setActive] = useState(false);
    const [profile, setProfile] = useState<User>();

    const containerRef = useRef<View>(null);

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
        try {
            const fetchItem = async () => {
                const { data } = await axios.get(`/products/${id}`);
                if (data.success) {
                    setItem(data.data);
                    setRVariant(data.data.randomVar);
                    setListVariant(data.data.variants);
                }
            };
            fetchItem();
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        const getProfile = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userObject = JSON.parse(user);
                setProfile(userObject);
            }
        };

        getProfile();
    }, []);
    console.log(listVariant);
    return (
        <SafeAreaView className="bg-background">
            <ScrollView showsVerticalScrollIndicator={false} className="relative">
                {item && (
                    <TouchableWithoutFeedback onPress={handlePressOutside}>
                        <View className="flex flex-col items-center justify-center">
                            <Animated.FlatList
                                ref={flatListRef}
                                onScroll={onScroll}
                                data={item.images}
                                renderItem={({ item, index }) => {
                                    return <Image key={item} item={item} index={index} x={x} />;
                                }}
                                keyExtractor={(item) => item.id}
                                scrollEventThrottle={16}
                                horizontal={true}
                                bounces={false}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                onViewableItemsChanged={onViewableItemsChanged}
                                viewabilityConfig={{
                                    minimumViewTime: 300,
                                    viewAreaCoveragePercentThreshold: 10,
                                }}
                            />
                            <View>{item?.images && <Pagination item={item.images} x={x} />}</View>

                            <Text className="mt-5 mb-[10px] font-bold text-xl">{item.name}</Text>
                            <Text className="text-xl text-money mb-[10px]">${item.price}</Text>
                            <View className="flex flex-row mb-10">
                                {/* <Rating readOnly value={5} size="small" className="mr-44px" /> */}
                                <Text>Sumbit a Review</Text>
                            </View>
                            <View className="flex flex-row items-center">
                                <View className="w-[140px] border-b-[3px] border-main">
                                    <TouchableOpacity>
                                        <Text className="text-main font-semibold text-base text-center">
                                            Infomation
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="w-[140px]">
                                    <TouchableOpacity>
                                        <Text className="font-semibold text-base text-center">Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className="p-5 w-full">
                                <View className="w-full h-[302px] bg-white mt-[10px] mb-40 rounded-[10px]">
                                    {/* <Review /> */}
                                    <ProductInfo info={item.desc} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                <View className="absolute bottom-0 w-full mb-10">
                    <View className="px-10 flex flex-row items-center">
                        <View className="bg-main flex-1 py-4 rounded-[30px] mr-7">
                            <TouchableOpacity onPress={() => setActive(true)}>
                                <Text className="font-bold text-xl text-white text-center">Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                        <HeartIcon width={36} height={32} color="black" />
                    </View>
                </View>
                {active && (
                    <Comfirm rVariant={rVariant} listVariant={listVariant} id={id} item={item} user={profile?._id} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailScreen;
