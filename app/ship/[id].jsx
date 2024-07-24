import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState, useEffect} from 'react'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { getShipByID } from '../../lib/appwrite'
import { getFormattedDate } from '../../lib/utils'

import Banner from '../../components/Banner'

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

  if(!isLoading){
  return (
    <SafeAreaView className=" bg-white h-full">
      <Banner></Banner>
    <View >
      <Text className="font-pregular p-1 text-xl text-primary">Dettaglio Consegna</Text>
      <View className=" border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Descrizione</Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.title}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Corriere</Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.carrier}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Mittente </Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.sender}</Text>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-m text-gray-50 bg-cyan-600 p-3">Arrivo Previsto </Text>
      <Text className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{getFormattedDate(ship.dateShip)}</Text>
      </View>
      {ship.state=="arrived" ?
       <View>
        <Text className="text-xl p-3 text-gray-50 text-center bg-lime-500">Consegnato</Text>
       </View> 
       : null }
       {ship.state=="incoming" ?
       <View>
        <Text className="text-xl p-3 text-gray-50 text-center bg-yellow-300">In Arrivo</Text>
       </View> 
       : null }
      {ship.state=="retard" ?
       <View>
        <Text className="text-xl p-3 text-gray-50 text-center bg-red-500">Non Consegnato</Text>
       </View> 
       : null }
    </View>
    </SafeAreaView>
  )
}else{
  return(
    <View className="flex-1 text-primary text-2xl items-center justify-center bg-white" >
    <Text>ATTENDI</Text>
  </View>
  )
}
}

export default shipDetail

const styles = StyleSheet.create({})