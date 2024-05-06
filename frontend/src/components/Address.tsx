import { View, Text, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Address as A } from '../types/type';

type Props = {
    data: A;
    setAddress: Dispatch<SetStateAction<A | undefined>>;
    type: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const Address = ({ data, setAddress, type, setOpen }: Props) => {
    if (type === 'Change') {
        return (
            <TouchableOpacity
                className="px-5 py-[10px] rounded-[5px] bg-white border border-main mb-[10px]"
                onPress={() => {
                    setAddress(data);
                    setOpen(false);
                }}
            >
                <View className="w-full flex flex-row items-center justify-between pb-[10px] border-b border-gray1 mb-[10px]">
                    <Text className="font-semibold">{data?.receiver}</Text>
                    <Text>+{data?.phone}</Text>
                </View>
                <View className="flex flex-col gap-2">
                    <Text className="text-xs">Province/City: {data?.province}</Text>
                    <Text className="text-xs">District: {data?.districts}</Text>
                    <Text className="text-xs">Wards: {data?.wards}</Text>
                    <Text className="text-xs">Specific: {data?.specific}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View className="px-5 py-[10px] rounded-[5px] bg-white">
            <View className="w-full flex flex-row items-center justify-between pb-[10px] border-b border-gray1 mb-[10px]">
                <Text className="font-semibold">{data?.receiver}</Text>
                <Text>+{data?.phone}</Text>
            </View>
            <View className="flex flex-col gap-2">
                <Text className="text-xs">Province/City: {data?.province}</Text>
                <Text className="text-xs">District: {data?.districts}</Text>
                <Text className="text-xs">Wards: {data?.wards}</Text>
                <Text className="text-xs">Specific: {data?.specific}</Text>
            </View>
        </View>
    );
};

export default Address;
