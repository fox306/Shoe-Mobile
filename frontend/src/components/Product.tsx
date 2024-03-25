import { View, Text, Image, Touchable, TouchableOpacity, GestureResponderEvent, Pressable } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { HeartIcon as NoF } from 'react-native-heroicons/outline';
import { HeartIcon as F } from 'react-native-heroicons/solid';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product as P } from '../types/type';
import axios from '../utils/axios';

type Props = {
    name: string;
    item: P;
    user: string | null;
    setLoad: Dispatch<SetStateAction<boolean>>;
    load: boolean;
};
const Product = ({ name, item, user, setLoad, load }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    console.log(user);
    const handleFavorite = async (e: GestureResponderEvent) => {
        e.stopPropagation();
        if (!user) {
            navigation.navigate('Login');
            return;
        }
        if (item.isFavorite) {
            const { data } = await axios.delete(`/favorites/un-favorite/${item._id}`);
            if (data.success) {
                setLoad(!load);
            }
        } else {
            const { data } = await axios.post('/favorites', {
                user: user,
                product: item._id,
            });
            if (data.success) {
                setLoad(!load);
            }
        }
    };
    return (
        <View className="flex flex-row justify-center">
            <TouchableOpacity
                key={item._id}
                className={`bg-white ${
                    name === 'Home' ? 'w-[180px] mr-10' : `w-[150px]`
                } h-[252px] rounded-[30px] relative`}
                onPress={() => navigation.navigate('Detail', { id: item._id })}
            >
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={{
                        width: name === 'Home' ? 140 : 120,
                        height: 120,
                    }}
                    className={`rounded-[20px] absolute mt-[-20px] ${name === 'Home' ? 'left-5' : 'left-[15px]'}`}
                />
                <View className="mt-[110px] flex flex-col items-center justify-center">
                    <Text className="font-bold">
                        {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
                    </Text>
                    <Text className="mt-[6px]">{item.brand}</Text>
                    <Text className="text-money">${item.price}</Text>
                    <View className="flex flex-row items-center justify-between mt-[10px] px-5">
                        <TouchableOpacity
                            className={`w-[100px] h-8 rounded-[36px] bg-main flex items-center justify-center ${
                                name === 'Home' ? 'mr-5' : 'mr-2'
                            }`}
                        >
                            <Text className="text-white">Add To Cart</Text>
                        </TouchableOpacity>
                        {item.isFavorite ? (
                            <F size={24} color="red" onPress={handleFavorite} />
                        ) : (
                            <NoF size={24} color="#000000" onPress={handleFavorite} />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Product;
