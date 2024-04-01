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
    Red: 'bg-[#FC3E39]',
    Blue: 'bg-[#0000FF]',
    Gray: 'bg-[#808080]',
    Cyan: 'bg-[#00FFFF]',
    Pink: 'bg-[#FFC0CB]',
    Green: 'bg-[#00FF00]',
    Black: 'bg-[#171717]',
    White: 'bg-[#FFFFFF]',
    Brown: 'bg-[#A52A2A]',
    Purple: 'bg-[#800080]',
    Yellow: 'bg-[#FFFF00]',
    Orange: 'bg-[#FFA500]',
    Silver: 'bg-[#C0C0C0]',
};

const Comfirm = ({ rVariant, listVariant, id, item, user }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [items, setItems] = useState<RVariant>({
        color: rVariant?.color ?? '',
        hex: rVariant?.hex ?? '',
        image: rVariant?.image ?? '',
        quantity: rVariant?.quantity ?? 0,
        size: rVariant?.size ?? 0,
    });
    console.log(colors[items.color]);
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
        setItems({ size: newSize, color: '', quantity: 0, hex: '', image: '' });
    };
    const handleSetColor = (newColor: string, hex: string) => {
        setItems({ ...items, color: newColor, hex: hex });
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
                    `/variants/find/by-info?product=${id}&size=${items.size}&color=${items.color}`,
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
                    <Text className="text-center font-bold text-base">{item?.name}</Text>
                </View>
                <View className="py-5 px-10">
                    <Text className="font-semibold">Size</Text>
                    <View className="flex flex-row gap-[10px] mt-[5px]">
                        {listVariant?.listSize.map((item) => (
                            <View
                                key={item}
                                className={`w-10 h-10 ${
                                    item === items.size ? 'bg-main' : 'bg-gray1'
                                } rounded-[15px] flex items-center justify-center`}
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
                            <View key={item.hex} className={`relative w-5 h-5 ${colors[item.color]} rounded-full`}>
                                <TouchableOpacity onPress={() => handleSetColor(item.color, item.hex)}>
                                    <View
                                        className={`absolute left-[-3px] top-[-3px] p-2.5 rounded-full border-[3px] ${
                                            item.color === items.color ? 'border-gray1' : ''
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
