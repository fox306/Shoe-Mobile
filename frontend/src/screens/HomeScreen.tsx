import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    useWindowDimensions,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { ArrowRightIcon, MagnifyingGlassIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Product from '../components/Product';
import Navbar from '../components/Navbar';
import { Category as C, Product as P } from '../types/type';
import Loading from '../components/Loading';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [user, setUser] = useState<string | null>(null);
    const [items, setItems] = useState<P[]>();
    const [hots, setHots] = useState<P[]>();
    const [category, setCategory] = useState<C[]>();
    const [active, setActive] = useState(0);
    const [cateId, setCateId] = useState('');
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [load, setLoad] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState(0);
    // const getUser = async () => {
    //     const user = await AsyncStorage.getItem('token');
    //     console.log(user);
    //     setUser(user);
    // };
    const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }) => {
        // if (nativeEvent.key === 'Enter') {
        //     performSearch();
        // }
        // console.log(nativeEvent.key);
    };

    const performSearch = () => {
        // console.log('Perform search with:', searchText);
        navigation.navigate('Search', { keyword: keyword, user: user });
        Keyboard.dismiss();
    };

    const { height } = useWindowDimensions();
    const modifiedHeight = height + 36;

    useEffect(() => {
        const getProfile = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userObject = JSON.parse(user);
                setUser(userObject._id);
            }
        };

        getProfile();
    }, []);
    useEffect(() => {
        try {
            const fetchCate = async () => {
                const { data } = await axios.get('/categories');
                if (data.success) {
                    setCategory(data.data);
                    setCateId(data.data[0]._id);
                }
            };
            fetchCate();
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        try {
            const fetchItems = async () => {
                const { data } = await axios.get(`/products/find/by-category?category=${cateId}&pageSize=5`);
                if (data.success) {
                    setItems(data.data);
                    console.log(data.data);
                }
            };
            fetchItems();
        } catch (error) {
            console.log(error);
        }
    }, [cateId, load]);
    useEffect(() => {
        try {
            const fetchItems = async () => {
                const { data } = await axios.get('/revenue/products/hot');
                if (data.success) {
                    setHots(data.data);
                    setTotal(data.total);
                }
            };
            fetchItems();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChange = (id: string, index: number) => {
        setCateId(id);
        setActive(index);
    };

    const handleMoveCart = () => {
        navigation.navigate('Cart', { user: user });
    };
    useEffect(() => {
        if (user) {
            const fetchCart = async () => {
                const { data } = await axios.get(`/carts/user/${user}`);
                if (data.success) {
                    setCartCount(data.total);
                }
            };
            fetchCart();
        }
    }, [refresh]);
    console.log(user);
    return (
        <SafeAreaView className="relative" style={{ height: modifiedHeight }}>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-background">
                <View className="pt-[50px]">
                    <View className="flex flex-row justify-between items-center px-[50px]">
                        <View>
                            <Text className="text-main text-3xl">Sneakers</Text>
                            <Text className="text-main text-3xl">For Everyone</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={handleMoveCart}>
                                <View className="relative">
                                    <ShoppingCartIcon size={30} className="text-main" color="#33A0FF" />
                                </View>
                                <View className="w-4 h-4 rounded-full bg-main absolute right-[-5px] top-[-3px]">
                                    <Text className="text-[10px] text-white text-center">{cartCount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="px-10">
                        <View className="bg-search py-[10px] pl-[30px] flex flex-row items-center justify-between my-10 rounded-full">
                            <TextInput
                                className="text-gray1 flex-1"
                                onKeyPress={handleKeyPress}
                                placeholder="women"
                                value={keyword}
                                onChangeText={setKeyword}
                            ></TextInput>
                            <View className="px-[13px]">
                                <TouchableOpacity onPress={performSearch}>
                                    <MagnifyingGlassIcon color="#33A0FF" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
                        <View className="flex flex-row justify-between pl-10">
                            {category &&
                                category.map((item, i) => (
                                    <TouchableOpacity key={i} onPress={() => handleChange(item._id as string, i)}>
                                        <View
                                            className={`w-20 h-[33px] mr-[10px] ${
                                                active === i ? 'border-b-[3px] border-main' : ''
                                            } `}
                                        >
                                            <Text className="text-main text-base text-center">{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </ScrollView>
                    <View className="mt-[30px]">
                        <View className="pr-5 mb-[5px]">
                            <Text className="text-xs text-main text-right">See more &gt;</Text>
                        </View>
                        <View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingTop: 20, paddingLeft: 40 }}
                                data={items}
                                keyExtractor={(item, idx) => item._id + idx}
                                renderItem={({ item }) => (
                                    <Product
                                        name="Home"
                                        key={item._id}
                                        item={item}
                                        user={user}
                                        setLoad={setLoad}
                                        load={load}
                                        setRefresh={setRefresh}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View className="mt-[50px] mb-[100px]">
                        <View className="flex flex-row justify-between items-center pl-10 pr-5 mb-[5px]">
                            <Text className="font-bold text-xl tracking-[4px] text-main">HOT</Text>
                            <Text className="text-xs text-main text-right ">All({total}) &gt;</Text>
                        </View>
                        <View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingTop: 20, paddingLeft: 40 }}
                                data={hots}
                                keyExtractor={(item, idx) => item._id + idx}
                                renderItem={({ item }) => (
                                    <Product
                                        name="Home"
                                        key={item._id}
                                        item={item}
                                        user={user}
                                        setLoad={setLoad}
                                        load={load}
                                        setRefresh={setRefresh}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Navbar name="Home" load />
        </SafeAreaView>
    );
};

export default HomeScreen;
