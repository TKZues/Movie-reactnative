import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function Slider({ sliderList }) {
  return (
    <View className="">
      <FlatList
        data={sliderList}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View>
            {/* <Text>{index}</Text> */}
            <Image
              source={{ uri: item?.image }}
              className="h-[130px] w-[330px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      />
    </View>
  );
}
