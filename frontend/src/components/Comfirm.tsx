import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Product, RVariant, Variant } from '../types/type';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    rVariant: RVariant | undefined;
    listVariant: Variant | undefined;
    id: string;
    item: Product | undefined;
    user: string | undefined;
};

const colors: { [key: string]: string } = {
    Blue: 'bg-[#006CFF]',
    Red: 'bg-[#FC3E39]',
    Black: 'bg-[#171717]',
    Pink: 'bg-[#FF00B4]',
    Yellow: 'bg-[#FFF600]',
    Wheat: 'bg-[#EFDFDF]',
};
const borders: { [key: string]: string } = {
    Blue: 'border-[#006CFF]',
    Red: 'border-[#FC3E39]',
    Black: 'border-[#171717]',
    Pink: 'border-[#FF00B4]',
    Yellow: 'border-[#FFF600]',
    Wheat: 'border-[#EFDFDF]',
};

const Comfirm = ({ rVariant, listVariant, id, item, user }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [items, setItems] = useState<RVariant>({
        size: rVariant?.size ?? 0,
        color: rVariant?.color ?? '',
        quantity: rVariant?.quantity ?? 0,
    });

    const [quantity, setQuantity] = useState<number>(1);

    const handleDes = () => {
        if (quantity <= 1) return;
        else {
            setQuantity(quantity - 1);
        }
    };
    const handleIns = () => {
        if (quantity >= items.quantity) return;
        else {
            setQuantity(quantity + 1);
        }
    };
    const handleSetSize = (newSize: number) => {
        setItems({ size: newSize, color: '', quantity: 0 });
    };
    const handleSetColor = (newColor: string) => {
        setItems({ ...items, color: newColor });
    };

    const handleAddCart = async () => {
        const { data } = await axios.post('/carts/addToCart', {
            user: user,
            product: id,
            image: item?.images[0],
            name: item?.name,
            color: items.color,
            size: items.size,
            quantity: quantity,
            price: item?.price,
        });
        if (data.success) {
            Toast.show({
                type: 'success',
                text1: 'Add to Cart Success',
            });
            navigation.replace('Cart', { user: user });
        }
    };

    useEffect(() => {
        try {
            const getQuantity = async () => {
                const { data } = await axios.get(
                    `/variants/product/color/size?product=${id}&color=${items.color}&size=${items.size}`,
                );
                if (data.success) {
                    setItems({ ...items, quantity: data.data.quantity });
                } else {
                    setItems({ ...items, quantity: 0 });
                }
            };
            getQuantity();
        } catch (error) {
            console.log(error);
        }
    }, [items.color]);
    return (
        <View className="absolute bottom-0 w-screen h-auto bg-white rounded-[30px]">
            <View className="p-5">
                <View className="w-full border-b border-gray1 pb-[10px]">
                    <Text className="text-center font-bold text-base">Nike Air Force 1</Text>
                </View>
                <View className="py-5 px-10">
                    <Text className="font-semibold">Size</Text>
                    <View className="flex flex-row gap-[10px] mt-[5px]">
                        {listVariant?.listSize.map((item) => (
                            <View
                                key={item}
                                className={`w-10 h-10 ${
                                    item === items.size ? 'bg-main' : 'bg-gray1'
                                } bg-main rounded-[15px] flex items-center justify-center`}
                            >
                                <TouchableOpacity onPress={() => handleSetSize(item)}>
                                    <Text
                                        className={`font-medium text-base ${
                                            item === items.size ? 'text-white' : 'text-black'
                                        } `}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="py-5 px-10 border-b border-gray1">
                    <Text className="font-semibold">Color</Text>
                    <View className="flex flex-row gap-5 mt-[5px]">
                        {listVariant?.listColor.map((item) => (
                            <View key={item} className={`relative w-5 h-5 ${colors[item]} rounded-full`}>
                                <TouchableOpacity onPress={() => handleSetColor(item)}>
                                    <View
                                        className={`absolute left-[-3px] top-[-3px] p-2.5 rounded-full border-[3px] ${
                                            item === items.color ? 'border-gray1' : ''
                                        } `}
                                    ></View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="py-5 px-[10px] flex flex-row gap-10 items-center">
                    <View>
                        {items.quantity === 0 ? (
                            <Text className="font-semibold text-gray1">Available: </Text>
                        ) : (
                            <Text className="font-semibold text-gray1">Available: {items.quantity}</Text>
                        )}
                    </View>
                    <View className="flex flex-row items-center justify-between w-[180px] h-10 rounded-[30px] border">
                        <View className="flex-1">
                            <TouchableOpacity onPress={handleDes}>
                                <Text className="font-bold text-xl text-center">-</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="h-8 border border-gray3"></View>
                        <View className="flex-1">
                            <Text className="font-bold text-xl text-center">{quantity}</Text>
                        </View>
                        <View className="h-8 border border-gray3"></View>

                        <View className="flex-1">
                            <TouchableOpacity onPress={handleIns}>
                                <Text className="font-bold text-xl text-center">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="px-5">
                    <TouchableOpacity onPress={handleAddCart}>
                        <View className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center">
                            <Text className="text-white text-xl font-bold tracking-[4px]">Comfirm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Comfirm;
