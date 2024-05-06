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
import Review from '../components/Review';
import ProductInfo from '../components/ProductInfo';
import { Comment, Product, RVariant, User, Variant } from '../types/type';
import axios from '../utils/axios';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import Comfirm from '../components/Comfirm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from '@kolking/react-native-rating';
import { HeartIcon as NoF } from 'react-native-heroicons/outline';
import { HeartIcon as F } from 'react-native-heroicons/solid';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteParams = {
    id: string;
};

const DetailScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    const [form, setForm] = useState(false);
    const [load, setLoad] = useState(false);

    const containerRef = useRef<View>(null);
    const [comment, setComment] = useState<Comment[]>();

    const handlePressOutside = () => {
        setActive(false);
    };

    const handleFavorite = async () => {
        if (!profile) {
            navigation.navigate('Login');
            return;
        }
        if (item) {
            if (item.isFavorite) {
                const { data } = await axios.delete(`/favorites/un-favorite/${item._id}`);
                if (data.success) {
                    setLoad(!load);
                }
            } else {
                const { data } = await axios.post('/favorites', {
                    user: profile._id,
                    product: item._id,
                });
                if (data.success) {
                    setLoad(!load);
                }
            }
        }
    };
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/comments/find/by-product?product=${id}`);
            if (data.success) {
                setComment(data.data);
            }
        };
        fetchData();
    }, [load]);

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
                    setRVariant(data.data.randomVariant);
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
    console.log(item);
    return (
        <SafeAreaView className="bg-background">
            <ScrollView showsVerticalScrollIndicator={false} className="relative">
                {item && (
                    // < onPress={handlePressOutside}>
                    <View className="flex flex-col items-center justify-center" onTouchEnd={handlePressOutside}>
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
                            <Rating baseColor="#FF952D" disabled size={18} rating={5} />
                            {/* <Text>Sumbit a Review</Text> */}
                        </View>
                        <View className="flex flex-row items-center">
                            <View className={`w-[140px] ${form ? '' : 'border-b-[3px] border-main'}`}>
                                <TouchableOpacity onPress={() => setForm(false)}>
                                    <Text className={`${form ? '' : 'text-main'} font-semibold text-base text-center`}>
                                        Infomation
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className={`w-[140px] ${form ? 'border-b-[3px] border-main' : ''}`}>
                                <TouchableOpacity onPress={() => setForm(true)}>
                                    <Text className={`${form ? 'text-main' : ''} font-semibold text-base text-center`}>
                                        Review
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="p-5 w-full">
                            <View className="w-full h-[302px] bg-white mt-[10px] mb-40 rounded-[10px]">
                                {form ? <Review comment={comment} /> : <ProductInfo info={item.desc} />}
                            </View>
                        </View>
                    </View>
                )}

                <View className="absolute bottom-0 w-full mb-10">
                    <View className="px-10 flex flex-row items-center">
                        <View className="bg-main flex-1 py-4 rounded-[30px] mr-7">
                            <TouchableOpacity onPress={() => setActive(true)}>
                                <Text className="font-bold text-xl text-white text-center">Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                        {item && item.isFavorite ? (
                            <F size={36} color="red" onPress={handleFavorite} />
                        ) : (
                            <NoF size={36} color="#000000" onPress={handleFavorite} />
                        )}
                    </View>
                </View>
            </ScrollView>
            {active && (
                <Comfirm rVariant={rVariant} listVariant={listVariant} id={id} item={item} user={profile?._id} />
            )}
        </SafeAreaView>
    );
};

export default DetailScreen;
