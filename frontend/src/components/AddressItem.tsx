import { View, Text, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Switch } from 'react-native-paper';
import { Address } from '../types/type';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';

type Props = {
    item: Address;
    setLoad: Dispatch<SetStateAction<boolean>>;
    setActive: Dispatch<SetStateAction<boolean>>;
    setAddressDefault: Dispatch<SetStateAction<string>>;
};

const AddressItem = ({ item, setLoad, setActive, setAddressDefault }: Props) => {
    const handleDelete = async (id: string) => {
        const { data } = await axios.delete(`/deliveryAddress/${id}`);
        if (data.success) {
            setLoad((prev) => !prev);
            Toast.show({
                type: 'success',
                text1: 'Delete Address success',
            });
        }
    };
    const [isSwitchOn, setIsSwitchOn] = useState(item.isDefault);

    const onToggleSwitch = (id: string) => {
        setIsSwitchOn(!isSwitchOn);
        setActive(true);
        setAddressDefault(id);
    };

    return (
        <View className="px-[20px] pt-[10px] pb-[6px] bg-white rounded-[10px]">
            <View className="w-full flex flex-row justify-between items-center pb-[10px] border-b border-opacity-30">
                <Text className="font-semibold">{item.receiver}</Text>
                <Text>{item.phone}</Text>
            </View>
            <View className="flex flex-col gap-2 px-[10px] pb-[10px] border-b border-opacity-30">
                <Text className="text-xs">Province/City: {item.province}</Text>
                <View className="w-full flex flex-row justify-between">
                    <Text className="text-xs">District: {item.districts}</Text>
                    <Text className="text-xs">Wards: {item.wards}</Text>
                </View>
                <Text className="text-xs">Specific: {item.specific}</Text>
            </View>

            <View className="w-full px-[10px] mt-[6px] flex flex-row items-center justify-between">
                <TouchableOpacity onPress={() => handleDelete(item._id as string)}>
                    <Text className="text-red text-xs">Delete</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center gap-[15px]">
                    <Text className="text-xs text-main">Default</Text>
                    <Switch value={isSwitchOn} onValueChange={() => onToggleSwitch(item._id as string)} />
                </View>
            </View>
        </View>
    );
};

export default AddressItem;
