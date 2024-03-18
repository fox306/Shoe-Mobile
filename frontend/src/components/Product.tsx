import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { HeartIcon } from 'react-native-heroicons/outline';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product as P } from '../types/type';

type Props = {
    name: string;
    item: P;
};
const Product = ({ name, item }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <View
            key={item._id}
            className={`bg-white ${
                name === 'Home' ? 'w-[180px]' : 'w-[170px]'
            } h-[252px] rounded-[30px] mr-10 relative`}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item._id })}>
                <Image
                    source={{
                        uri: item.images[0] && item.images[0],
                    }}
                    style={{
                        width: 140,
                        height: 120,
                    }}
                    className={`rounded-[20px] absolute top-[-20px] ${name === 'Home' ? 'left-5' : 'left-[15px]'}`}
                />
                <View className="mt-[110px] flex flex-col items-center justify-center">
                    <Text className="font-bold">
                        {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
                    </Text>
                    <Text className="mt-[6px]">{item.brand}</Text>
                    <Text className="text-money">${item.price}</Text>
                    <View className="flex flex-row items-center justify-between mt-[10px]">
                        <TouchableOpacity className="w-[100px] h-8 rounded-[36px] bg-main flex items-center justify-center mr-5">
                            <Text className="text-white">Add To Cart</Text>
                        </TouchableOpacity>
                        <HeartIcon width={20} color="#000000" height={18} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Product;
