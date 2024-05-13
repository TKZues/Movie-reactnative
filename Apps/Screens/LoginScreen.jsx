import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <Image source={require('./../../assets/images/login.jpg')} 
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 mt-[-20px]  bg-white rounded-t-3xl shadow-md">
        <Text className="text-[25px] font-bold">Community Marketplace</Text>
        <Text className="text-[14px] mt-5 text-slate-500" >Buy Sell Marketplace where you can sell old item and make real money</Text>
        <TouchableOpacity className="p-4 bg-blue-500 rounded-full mt-10" onPress={onPress}>
            <Text className="text-white text-center text-[12px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}