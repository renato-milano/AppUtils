import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { getShipByID } from '../../lib/appwrite'
import { getFormattedDate } from '../../lib/utils'

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
    <SafeAreaView className="bg-gray-50">
    <View>
      <Text className="font-pregular text-xl text-primary">Dettaglio Consegna</Text>
      <View className="flex-row items-center">
      <Text className="font-pregular text-l h-[8vh] w-[15vh] text-gray-50 bg-cyan-600 p-3">Descrizione</Text>
      <Text className="font-pregular text-l h-[8vh] p-3 bg-sky-200 w-full">{ship.title}</Text>
      </View>
      <View className="flex-row items-center">
      <Text className="font-pregular text-l h-[8vh] w-[15vh] text-gray-50 bg-cyan-600 p-3">Corriere</Text>
      <Text className="font-pregular text-l h-[8vh] p-3 bg-sky-200 w-full">{ship.carrier}</Text>
      </View>
      <View className="flex-row items-center">
      <Text className="font-pregular text-l h-[8vh] w-[15vh] text-gray-50 bg-cyan-600 p-3">Mittente </Text>
      <Text className="font-pregular text-l h-[8vh] p-3 bg-sky-200 w-full">{ship.sender}</Text>
      </View>
      <View className="flex-row items-center">
      <Text className="font-pregular text-l h-[8vh] w-[15vh] text-gray-50 bg-cyan-600 p-3">Arrivo Previsto </Text>
      <Text className="font-pregular text-l h-[8vh] p-3 bg-sky-200 w-full">{getFormattedDate(ship.dateShip)}</Text>
      </View>
      {ship.arrived ?
       <View>
        <Text className="text-xl p-3 text-gray-50 text-center bg-lime-500">Consegnato</Text>
       </View> 
       : <View>
        <Text className="text-xl p-3 text-gray-50 text-center bg-red-600">Non Consegnato</Text>
      </View> }
    </View>
    </SafeAreaView>
  )
}
}

export default shipDetail

const styles = StyleSheet.create({})