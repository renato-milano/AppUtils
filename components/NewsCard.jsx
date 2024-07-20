import { View, Text,Image, SafeAreaView} from 'react-native'
import React from 'react'
import {images} from "../constants"

const NewsCard = ({post}) => {
  return (
    <SafeAreaView className="flex-row justify-center items-center border-b-2 border-black-200">
    <View className="w-[50px] h-[50px] rounded-lg">
    <Image source={{uri:post.users.avatar}} className="border-10 w-full h-full rounded-lg" resizeMode='cover'></Image>
    </View>
    <View className="p-1 flex-1 ">
      <Text className="font-pregular text-l">{post.title}</Text>
      <Text className="font-pregular text-m">{post.descrizione}</Text>
      <Text className="font-pregular text-xs">{post.users.username}</Text>
    </View>
    </SafeAreaView>
  )
}

export default NewsCard