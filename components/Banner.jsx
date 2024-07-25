import { StyleSheet, Text, View,Image } from 'react-native'
import React, {useEffect} from 'react'
import { icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'
import { getCurrentUser } from '../lib/appwrite'

const Banner = () => {
    const {user,isLoading,isLogged}= useGlobalContext()
    console.log(isLogged)
    useEffect(() => {
        if(isLoading){
        getCurrentUser();
        }
    }, [])
    
  return (
    
    <SafeAreaView className="px-2 bg-white">
        { !isLoading && isLogged ?
    <View className="items-center flex-row justify-between">
        <Image resizeMode="contain"
      className="h-[5vh] w-[5vh] rounded-xl"
      source={images.iglmlogo}>
        </Image>
      <Text className="text-primary text-2xl">IGLM STORE</Text>
      {user!=null ?
      <Image 
      resizeMode="contain"
      className="h-[5vh] w-[5vh] rounded-xl"
      source={{uri: user.avatar}}></Image>
    :null}
    </View>
      : null}
    </SafeAreaView>
  
  )
}

export default Banner

const styles = StyleSheet.create({})