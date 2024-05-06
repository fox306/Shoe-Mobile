import { View, Text, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Rating } from '@kolking/react-native-rating';
import axios from '../utils/axios';
import { ItemCart } from '../types/type';
import Toast from 'react-native-toast-message';

type Props = {
    setForm: Dispatch<SetStateAction<boolean>>;
    user: string;
    product: ItemCart;
};

const Comments = ({ setForm, user, product }: Props) => {
    const [rating, setRating] = useState<number>(0);
    console.log(rating);
    const handleChange = useCallback((newRating: number) => {
        setRating(newRating);
    }, []);

    const handleSubmit = async () => {
        const form = new FormData();
        form.append('commentator', user);
        form.append('product', product.product);
        form.append('rating', rating.toString());

        const { data } = await axios.post('/comments', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            Toast.show({
                type: 'success',
                text1: 'Comment success',
            });
        }
    };
    return (
        <View className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-[10px]">
            <View className=" p-2 flex flex-col items-center justify-center ">
                <View className="mb-2">
                    <Text>Review about {product.name}</Text>
                </View>
                <View>
                    <Rating baseColor="#D1D1D6" fillColor="#FF952D" size={30} rating={rating} onChange={handleChange} />
                </View>
                <TouchableOpacity onPress={handleSubmit} className="py-2 px-4 bg-main rounded-xl mt-2">
                    <View>
                        <Text className="text-white">Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Comments;
