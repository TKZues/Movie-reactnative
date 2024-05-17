import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

export default function MyProduct() {
  const { user } = useUser();
  const db = getFirestore(app);
  const [myProductList, setMyProductList] = useState([]);
  useEffect(() => {
    user && getALlMyProduct();
  }, [user]);
  const getALlMyProduct = async () => {
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setMyProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <View>
      <LatestItemList lastsItemList={myProductList} />
    </View>
  );
}
