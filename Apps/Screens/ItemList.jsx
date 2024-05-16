import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useRoute } from "@react-navigation/native";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(params.category);
    params && getItemListCategory();
  }, [params]);

  const getItemListCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator className="mt-24" size={"large"} color={"#3b82f6"} />
      ) : itemList?.length > 0 ? (
        <LatestItemList lastsItemList={itemList} heading="Latest Post" />
      ) : (
        <Text className="p-5  text-[20px] text-gray-400 font-semibold justify-center text-center mt-20">
          No Post found
        </Text>
      )}
    </View>
  );
}
