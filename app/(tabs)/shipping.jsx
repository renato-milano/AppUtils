import { _View, FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import { RefreshControl } from 'react-native'
import { getAllShips } from '../../lib/appwrite'
import NewsCard from '../../components/NewsCard'
import ShipCard from '../../components/ShipCard'

const shipping = () => {

  const [data, setData] = useState([])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () =>{
      setisLoading(true);
      try {
        const response = await getAllShips();
        setData(response);
        
      } catch (error) {
        Alert.alert("Errore", error.message)
      }finally{
        setisLoading(false)
      }
    }
    fetchData();
  }, [])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () =>{
    setRefreshing(true);
    console.log("refreshing")
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="px-2 bg-white h-full">
      
    <FlatList 
    data={data}
    keyExtractor={(item)=> item.$id}
    renderItem={({item})=>(
      <ShipCard post={item}></ShipCard>
    )}
    ListHeaderComponent={()=>(
      <View>
        <Text className="font-pregular text-2xl text-primary">Consegne</Text>
        <SearchInput
        placeholder="Cerca tra le consegne..."/>
        <View className="w-full flex-1">
          <Text className="font-pregular text-l text-primary" >Consegne Recenti</Text>
        </View>
      </View>
    )}
    
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    
    />
    </SafeAreaView>
  )
}

export default shipping

const styles = StyleSheet.create({})