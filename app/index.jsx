import {  Text, View, Image, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Redirect, Slot} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import {images} from "../constants"
import { useGlobalContext } from '../context/GlobalProvider'
import { getCurrentUser } from '../lib/appwrite'

const RootLayout = () => {
  const {isLoading,isLogged}= useGlobalContext()
  console.log(isLogged)
  getCurrentUser();
  if(!isLoading && isLogged){ 
    console.log("logged"); 
    return <Redirect href="/home"></Redirect>;
  }
    return (
    <SafeAreaView className="h-full" style={{backgroundColor:'#324aa8'}}>
    <View 
    className="flex-1 items-center justify-center gap-5" 
    style={{backgroundColor:'#324aa8'}}>
    
      <Image source={images.iglm}></Image>
      <StatusBar style='auto'></StatusBar>
      <Link href='/sign-in' className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" style={{color:'white'}}>Entra</Link>
      <Text 
      className="text-xs primary"
      style={{color:'white'}}
      >Made with ❤️ by Renato Milano</Text>
    </View>
    </SafeAreaView>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 166,
    height: 58,
  },
});