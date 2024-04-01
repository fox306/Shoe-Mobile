import { View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Comment } from '../types/type';
import { Rating } from '@kolking/react-native-rating';

type Props = {
    comment: Comment[] | undefined;
};

const Review = ({ comment }: Props) => {
    return (
        <View className="p-5">
            {comment?.map((item) => (
                <View key={item._id} className="flex flex-row items-center">
                    <View className="rounded-full">
                        <Image
                            source={{ uri: item.commentator.avatar }}
                            style={{ width: 60, height: 60, borderRadius: 100 }}
                        />
                    </View>
                    <View className="ml-5 flex-1">
                        <Text className="font-bold text-xs">{item.commentator.fullName}</Text>
                        {/* <Text className="mt-[5px]">Giày good</Text> */}
                    </View>
                    <View>
                        <Rating baseColor="#FF952D" size={12} disabled rating={item.rating} />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default Review;
