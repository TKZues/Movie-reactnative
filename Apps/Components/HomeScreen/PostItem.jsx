import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-1 m-1 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={() =>
        navigation.push("product-detail", {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[180px] rounded-lg"
      />
      <View>
        <Text className="text-[16px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[18px] font-bold text-blue-600">
          {item.price}đ
        </Text>
        <Text className="text-[12px] text-blue-600 font-bold bg-blue-200 rounded-full w-[80px] p-1 mt-2 text-center">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
