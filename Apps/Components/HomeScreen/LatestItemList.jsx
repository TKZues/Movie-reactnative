import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LatestItemList({ lastsItemList, heading }) {
  return (
    <View>
      <Text className="font-bold text-[20px] mt-2">{heading}</Text>
      <FlatList
        data={lastsItemList}
        numColumns={2}
        renderItem={({ index, item }) => <PostItem item={item} />}
      />
    </View>
  );
}
