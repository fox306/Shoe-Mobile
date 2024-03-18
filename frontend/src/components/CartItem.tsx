import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { Children } from 'react';
import { HeartIcon, PencilIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { Checkbox } from 'react-native-paper';
import { SwipeButtonsContainer, SwipeItem, SwipeProvider } from 'react-native-swipe-item';
import { ItemCart } from '../types/type';

type Props = {
    data: ItemCart;
    onCheckedItem: () => void;
    onRemoveItem: () => void;
    type: string;
};

const CartItem = ({ data, onCheckedItem, onRemoveItem, type }: Props) => {
    const rightButton = (
        <SwipeButtonsContainer
            style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
                padding: 10,
            }}
        >
            <View className="flex flex-row items-center gap-[10px]">
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-main flex items-center justify-center"
                    onPress={() => console.log('left button clicked')}
                >
                    <HeartIcon size={16} color={'#ffffff'} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-main flex items-center justify-center"
                    onPress={onRemoveItem}
                >
                    <XMarkIcon size={16} color={'#ffffff'} />
                </TouchableOpacity>
            </View>
        </SwipeButtonsContainer>
    );
    return (
        <View className="flex-1">
            {type === 'Cart' ? (
                <SwipeProvider>
                    <SwipeItem rightButtons={rightButton}>
                        <View className="flex flex-row items-center mb-[10px]">
                            <View>
                                <Checkbox status={data.selected ? 'checked' : 'unchecked'} onPress={onCheckedItem} />
                            </View>
                            <View className="flex flex-row items-center p-[10px] bg-white rounded-[5px]">
                                <Image
                                    source={{ uri: data.image }}
                                    style={{ width: 80, height: 100 }}
                                    borderRadius={5}
                                />
                                <View className="ml-[15px]">
                                    <Text className="font-bold">
                                        {data.name.length > 20 ? data.name.slice(0, 20) + '...' : data.name}
                                    </Text>
                                    <Text className="text-money mt-[8px] mb-[22px]">${data.price}</Text>
                                    <View className="flex flex-row items-center justify-between">
                                        <Text className="text-xs">Size: {data.size}</Text>
                                        <View className="flex flex-row items-center gap-1 mx-[15px]">
                                            <Text className="text-xs">Color:</Text>
                                            <View className="relative w-[10px] h-[10px] bg-[#FFBE00] rounded-full">
                                                <View className="absolute left-[-2px] top-[-2px] p-[5px] rounded-full border-2 border-gray1"></View>
                                            </View>
                                        </View>
                                        <View>
                                            <Text className="text-xs">x{data.quantity}</Text>
                                        </View>
                                        <View className="ml-[10px]">
                                            <PencilIcon color={'#C7C7C7'} width={12} height={12} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </SwipeItem>
                </SwipeProvider>
            ) : (
                <View className="flex flex-row items-center mb-[10px]">
                    <View className="w-full flex flex-row items-center p-[10px] bg-white rounded-[5px]">
                        <Image source={{ uri: data.image }} style={{ width: 80, height: 100 }} borderRadius={5} />
                        <View className="ml-[15px]">
                            <Text className="font-bold">
                                {data.name.length > 20 ? data.name.slice(0, 20) + '...' : data.name}
                            </Text>
                            <Text className="text-money mt-[8px] mb-[22px]">${data.price}</Text>
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xs">Size: {data.size}</Text>
                                <View className="flex flex-row items-center gap-1 mx-[15px]">
                                    <Text className="text-xs">Color:</Text>
                                    <View className="relative w-[10px] h-[10px] bg-[#FFBE00] rounded-full">
                                        <View className="absolute left-[-2px] top-[-2px] p-[5px] rounded-full border-2 border-gray1"></View>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-xs">x{data.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default CartItem;
