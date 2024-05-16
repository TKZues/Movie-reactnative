import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();
  return (
    <View className="mt-2">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            options={{ headerShown: false }}
            onPress={() =>
              navigation.navigate("item-list", {
                category: item.name,
              })
            }
            className="flex-1 border-[1px] p-2 justify-center items-center border-blue-300 bg-blue-50 m-1 rounded-lg h-[80px]"
          >
            {/* <Text>{index}</Text> */}
            <Image source={{ uri: item.icon }} className="h-[40px] w-[40px]" />
            <Text className="text-[12px] mt-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
