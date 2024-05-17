import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import diary from "../../assets/images/diary.png";
import search from "../../assets/images/search.png";
import login from "../../assets/images/login.png";
import logout from "../../assets/images/logout.png";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const onMenuPress = (item) => {
    item?.path ? navigation.navigate(item.path) : null;
  };
  const menuList = [
    {
      id: 1,
      name: "My Product",
      icon: diary,
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: search,
      path: "explore",
    },
    {
      id: 3,
      name: "Tuan Kiet",
      icon: login,
      url: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: logout,
    },
  ];
  const { user } = useUser();
  return (
    <View className="p-5">
      <View className="items-center mt-10">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[80px] h-[80px] rounded-full"
        />
        <Text className="mt-2 font-bold text-[20px]">{user?.fullName}</Text>
        <Text className="mt-2 text-[14px] text-gray-500">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View className="mt-10">
        <FlatList
          data={menuList}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onMenuPress(item)}
              className="flex-1 items-center py-4 bg-blue-50 border-[1px] m-2 rounded-lg border-blue-600"
            >
              {item.icon && (
                <Image source={item?.icon} className="w-[50px] h-[50px]" />
              )}
              <Text>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
