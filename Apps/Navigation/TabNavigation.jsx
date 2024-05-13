import { View, Text } from 'react-native'
import React from 'react'

import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
      screenOptions={{headerShown:false}}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarLabel: ({color})=> (
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Explore" component={ExploreScreen} 
        options={{
          tabBarLabel: ({color})=> (
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="search" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Post" component={AddPostScreen} 
        options={{
          tabBarLabel: ({color})=> (
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="camera" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
          tabBarLabel: ({color})=> (
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="person-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}