import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

export default function ProductDetail({ navigation }) {
  const { params } = useRoute();
  const [product, setProductDetail] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    params && setProductDetail(params.product);
    shareButton();
  }, [params, navigation]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={24}
          color="black"
          style={{ color: "white", marginRight: 12 }}
          onPress={() => shareProduct()}
        />
      ),
    });
  };

  const shareProduct = async () => {
    const content = {
      message: product?.title + "\n" + product?.desc,
    };
    Share.share(content).then(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendEmailMessage = () => {
    const subject = "Regarding " + product.title;
    const body =
      "HI" + product.userName + "\n" + "I am interested in this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject" + subject + "&body=" + body
    );
  };
  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: product.image }} className="w-full h-[300px]" />
      <View className="p-3">
        <Text className="font-bold text-[20px]">{product?.title}</Text>
        <View className="items-baseline ">
          <Text className="mt-2 p-1 bg-blue-300 rounded-full w-[100px] text-blue-700 font-bold text-center justify-center">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-3 text-[20px] font-bold">Description</Text>
        <Text className="text-[14px] text-gray-700 mt-1 ">{product?.desc}</Text>
      </View>
      <View className="p-3 bg-blue-300 flex flex-row gap-3 item-center">
        <Image
          source={{ uri: product.userImage }}
          className="w-[40px] h-[40px] rounded-full"
        />
        <View>
          <Text className="font-bold text-[16px]">{product.userName}</Text>
          <Text className="text-gray-600">{product.userEmail}</Text>
        </View>
      </View>
      {user.primaryEmailAddress.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="bg-red-600 m-2 p-2 rounded-full"
        >
          <Text className="text-center text-white">Delete Product</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="bg-blue-600 m-2 p-2 rounded-full"
        >
          <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
