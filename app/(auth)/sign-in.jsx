import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

import {images} from '../../constants'

const SignIn = () => {
    const [form, setForm] = useState({
        email:'',
        password:''
    })
    const submit = ()=>{
        
        console.log("Funziona Porco di diocane")

    }
  return (
    <SafeAreaView className="h-full bg-primary">
        <ScrollView>

        <View className="w-full justify-center  min-h-[85vh] px-4 my-6">
            <View className="items-center">
            <Image source={images.iglm}></Image>
            </View>
            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({... form, email: e})}
            otherStyles="mt-7"
            keybordType="email-address"
            />        

            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({... form, password: e})}
            otherStyles="mt-7"
            
            />        
        <CustomButton
            title="Accedi"
            containerStyles="mt-10"
            handlePress={submit}
        ></CustomButton>
        <Text className="mt-5 font-psemibold text-semibold text-l text-white">Non hai un account? <Link href="/home">
        <Text style={{color:'yellow'}}>Creane uno</Text></Link></Text>
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})