import { StyleSheet, Text, View, TextInput} from 'react-native'
import React , { useState } from 'react'



const FormField = ({title,value,placeholder,handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="rounded-xl w-full h-16 px-4 bg-gray-100 focus:border-black items-center">
        <TextInput 
        className="flex-1 font-psemibold"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title==='Password' ? true:false}
        />

      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})