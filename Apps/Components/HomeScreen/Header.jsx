import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
      <View className="bg-white p-3 rounded-full m-3 flex flex-row items-center border-[1px] border-blue-500">
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          className="ml-3"
          onChangeText={(e) => console.log(e)}
        />
      </View>
    </View>
  );
}
