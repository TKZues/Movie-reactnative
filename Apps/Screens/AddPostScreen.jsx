import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore , collection, getDocs } from "firebase/firestore";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'

export default function AddPostScreen() {
  const db = getFirestore(app)
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryLits();
  }, [])

  const getCategoryLits = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(" Docs ", doc.data());
      setCategoryList(categoryList=>[...categoryList, doc.data()]);
    });

  }
  return (

    <View className ='p-10'>
      <Text className="text-[20px] font-bold">Add New Post</Text>
      
      <Formik
        initialValues={{title: '', desc:'',category:'', address:'', price:'', image:''}}
        onSubmit={value => console.log(value)}
      >
        {({handleChange, handleBlue, handleSubmit, values})=>(
          <View>
            <TextInput 
              style={styles.input}  
              placeholder='Title'
              value={values?.title}
              onChangeText={handleChange('title')}
            />
            <TextInput 
              style={styles.input}  
              placeholder='Description'
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange('desc')}
            />
            <TextInput 
              style={styles.input}  
              placeholder='Price'
              value={values?.price}
              keyboardType='number-pad'
              onChangeText={handleChange('price')}
            />

            
            <Picker onValueChange={handleChange('category')}  selectedValue={values.category} className="border-2">
              {categoryList&&categoryList.map((item, index)=>(
                <Picker.Item key={index} label={item.name} value={item.name} />
              ))}
            </Picker>
            <TextInput 
              style={styles.input}  
              placeholder='Address'
              value={values?.address}
              onChangeText={handleChange('address')}
            />
            <Button
              title = 'submit'
              className="mt-10"
              onPress = {handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    padding:10,
    marginTop:10,
    marginBottom:10,
    borderRadius:10,
    paddingHorizontal:17,
    textAlignVertical:'top',
    fontSize:17,
  }
})