import { Pressable, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState, useEffect} from 'react'
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { getShipByID } from '../../lib/appwrite'
import { getFormattedDate } from '../../lib/utils'

import Banner from '../../components/Banner'
import { icons } from '../../constants'

const shipDetail = () => {
    const{id:data} = useLocalSearchParams();
    const [ship, setShip] = useState(null);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () =>{
            console.log("fetching")
          setisLoading(true);
          try {
            const response = await getShipByID(data);
            setShip(response);
            
          } catch (error) {
            Alert.alert("", error.message)
          }finally{
            setisLoading(false)
          }
        }
        fetchData();
      }, [])
      const EditPress=()=>{

      }
  if(!isLoading){
  return (
    <SafeAreaView className=" bg-white h-full">
      <Banner></Banner>
    <View>
      <View className="flex-row justify-items-center">
      <Text className="font-pregular p-1 pb-5 pt-5 text-xl text-primary">Dettaglio Consegna</Text>
      <TouchableOpacity className="p-2 h-[60px] w-[60px items-center justify-center"
       style={styles.floatingButton} 
       onPress={()=>{
                const id= ship.$id;
                router.setParams(id)
                const lin = 'edit/'+id;
                router.replace(lin)
       }}
       >
       <Image className=" bg-yellow-200 h-[40px] w-[40px]" source={icons.edit} resizeMode='contain'></Image>
       </TouchableOpacity>
       </View>
      {ship.state=="arrived" ?
        <Text className="text-xl p-3 text-gray-50 text-center bg-lime-500">Consegnato</Text> 
       : null }
       {ship.state=="incoming" ?
        <Text className="text-xl p-3 text-gray-50 text-center bg-yellow-300">In Arrivo</Text>
       : null }
      {ship.state=="retard" ?
        <Text className="text-xl p-3 text-gray-50 text-center bg-red-500">Non Consegnato</Text> 
       : null }
      <View className=" border-b-2 border-gray-50 flex-row">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Descrizione</Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.title}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Corriere</Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.carrier}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Mittente </Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.sender}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row">
      <Text className="font-pregular w-[15vh] h-[10vh] text-m text-gray-50 bg-cyan-600 p-3">Arrivo Previsto </Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{getFormattedDate(ship.dateShip)}</Text>
      </View>

       
    </View>
    </SafeAreaView>
  )
}else{
  return(
    <View className="flex-1 text-primary text-2xl items-center justify-center bg-white" >
      <Text className="text-xl text-primary">Caricamento</Text>
    <Image className="mt-5" source={icons.loading}></Image>
  </View>
  )
}
}

export default shipDetail

const styles = StyleSheet.create({
  floatingButton:{                                    
    position: 'absolute',                                          
    top: 9,                                                    
    right: 10,
  }
})