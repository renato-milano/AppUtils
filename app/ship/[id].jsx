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
    <SafeAreaView>
    <View>
      <Text className="text-xl">{ship.title}</Text>
      <Text className="text-xl">{getFormattedDate(ship.dateShip)}</Text>
    </View>
    </SafeAreaView>
  )
}
}

export default shipDetail

const styles = StyleSheet.create({})