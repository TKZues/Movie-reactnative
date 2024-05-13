import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore , collection, getDocs, addDoc } from "firebase/firestore";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const db = getFirestore(app)
  const [loading,setLoading] = useState(false);
  const {user} = useUser()
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
  const inSubmitMethod=async (value) =>{
    setLoading(true);
    //Convert image
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+ Date.now()+".jpg");
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image = downloadUrl;
        value.userName = user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;
        const docRef = await addDoc(collection(db, "UserPost"),value)

        if(docRef.id){
          setLoading(false);
          Alert.alert('Successfully', 'Post Added Successfully');
        }
      })
    });
  }

  return (

    <View className ='p-10'>
      <Text className="text-[20px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-10">Create New Post and Start New Selling</Text>
      <Formik
        initialValues={{title: '', desc:'',category:'', address:'', price:'', image:'',userName:'', userEmail:'',userImage:'',}}
        onSubmit={value => inSubmitMethod(value)}
        validate={(values)=>{
          const errors ={}
          if(!values.title){
            console.log('title not present');
            ToastAndroid.show('title must be there', ToastAndroid.SHORT);
            errors.name = "title must be there";
          }
          else errors;
        }}
      >
        {({handleChange, handleBlue, handleSubmit, values, setFieldValue, errors})=>(
          <View>
            <TouchableOpacity onPress = {pickImage}>
              {image?<Image source={{uri:image}}  style={{width:100, height:100, borderRadius:10}}/>:      
              <Image source={require('../../assets/images/imageplacholder.png')} 
                style={{width:100, height:100, borderRadius:10}}
              />}
            </TouchableOpacity>
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

            
            
            <TextInput 
              style={styles.input}  
              placeholder='Address'
              value={values?.address}
              onChangeText={handleChange('address')}
            />
            
            <View style={{borderWidth:1,borderRadius:10, marginTop:10}}>
              <Picker 
                onValueChange={itemVale=>setFieldValue('category', itemVale)}  
                selectedValue={values.category} 
                className="border-2"
              >
                {categoryList.length>0&&categoryList?.map((item, index)=>(
                  <Picker.Item key={index} 
                  label={item.name} value={item.name} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity onPress = {handleSubmit} 
              style={{backgroundColor: loading?'#ccc':'#007bff'}}
              disabled={loading}
              className="bg-blue-500 p-3 rounded-full mt-10">
              {loading?<ActivityIndicator color='#fff'/>:
              <Text className="text-center text-white text-[14px]">
                Submit
              </Text>
              }
            </TouchableOpacity>
            {/* <Button
              title = 'submit'
              className="mt-10"
              onPress = {handleSubmit}
            /> */}
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