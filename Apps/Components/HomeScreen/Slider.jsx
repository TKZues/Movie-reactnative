import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function Slider({ sliderList }) {
  return (
    <View>
      <FlatList
        data={sliderList}
        renderItem={({ item, index }) => (
          <View>
            <Text>{index}</Text>
            <Image
              source={{ uri: item?.image }}
              className="h-[200px] w-[200px]"
            />
          </View>
        )}
      />
    </View>
  );
}
