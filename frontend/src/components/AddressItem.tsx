import { View, Text } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';
import { Address } from '../types/type';

type Props = {
    item: Address;
};

const AddressItem = ({ item }: Props) => {
    return (
        <View className="px-[20px] pt-[10px] pb-[6px]">
            <View className="w-full flex flex-row justify-between items-center pb-[10px] border-b border-opacity-30">
                <Text className="font-semibold">Nguyễn Văn A</Text>
                <Text>+84 9011039271</Text>
            </View>
            <View className="flex flex-col gap-2 px-[10px] pb-[10px] border-b border-opacity-30">
                <Text className="text-xs">Province/City: TP. Hồ Chí Minh</Text>
                <View className="w-full flex flex-row justify-between">
                    <Text className="text-xs">District: TP. Thủ Đức</Text>
                    <Text className="text-xs">Wards: P. Tam Phú</Text>
                </View>
                <Text className="text-xs">Specific: 123 võ văn ngân</Text>
            </View>

            <View className="w-full px-[10px] mt-[6px] flex flex-row items-center justify-between">
                <Text className="text-red text-xs">Delete</Text>
                <View className="flex flex-row items-center gap-[15px]">
                    <Text className="text-xs text-main">Default</Text>
                    <Switch />
                </View>
            </View>
        </View>
    );
};

export default AddressItem;
