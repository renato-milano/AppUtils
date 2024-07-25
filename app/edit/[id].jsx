import { StyleSheet, Text, TextInput, View, ScrollView, Modal,Pressable,Alert,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState, useEffect} from 'react'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { getShipByID } from '../../lib/appwrite'
import { getFormattedDate } from '../../lib/utils'
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { icons } from '../../constants'

import Banner from '../../components/Banner'
import { TouchableOpacity } from 'react-native'

const EditShip = () => {
    const{id:data} = useLocalSearchParams();
    const [date, setDate] = useState(dayjs());
    const [modalVisible, setModalVisible] = useState(false);
    const [ship, setShip] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [newState, setNewState] = useState("")
    useEffect(() => {
        const fetchData = async () =>{
            console.log("fetching IN EDIT SHIP")
            console.log(data)
          setisLoading(true);
          try {
            const response = await getShipByID(data);
            setShip(response);
            setDate(response.shipDate)
          } catch (error) {
            Alert.alert("", error.message)
          }finally{
            setisLoading(false)
          }
        }
        fetchData();
      }, [])
    
  if(!isLoading){
    console.log(date)
  return (
    <SafeAreaView className=" bg-white h-full">
      <Banner></Banner>
      <ScrollView>
    <View >
      <Text className="font-pregular p-1 text-xl text-primary">Modifica</Text>
      <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}>
      {ship.state=="arrived" ?
        <Text className="sticky text-xl p-3 text-gray-50 text-center bg-lime-500">Consegnato</Text>
       : null }
       {ship.state=="incoming" ?
        <Text className="sticky text-xl p-3 text-gray-50 text-center bg-yellow-300">In Arrivo</Text> 
       : null }
      {ship.state=="retard" ?
        <Text className="sticky text-xl p-3 text-gray-50 text-center bg-red-500">Non Consegnato</Text>
       : null }
       </TouchableOpacity>
      <View className=" border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Descrizione</Text>
      <TextInput className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.title}</TextInput>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Corriere</Text>
      <TextInput className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.carrier}</TextInput>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-l text-gray-50 bg-cyan-600 p-3">Mittente </Text>
      <TextInput className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{ship.sender}</TextInput>
      </View>
      <View className="border-b-2 border-gray-50 flex-row items-center">
      <Text className="font-pregular w-[15vh] h-[10vh] text-m text-gray-50 bg-cyan-600 p-3">Arrivo Previsto </Text>
      <TextInput className="font-pregular text-l h-[10vh] p-3 bg-sky-200 w-full">{getFormattedDate(ship.dateShip)}</TextInput>
      </View>
      <DateTimePicker
        mode="single"
        locale="it"
        date={ship.dateShip}
        onChange={(params) => {
            console.log("Diocane"); 
            setDate(params); 
            ship.dateShip=params.date; 
            setShip(ship); 
            console.log(ship);}}
      />
    </View>
    </ScrollView>
    <View className="">
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex flex-col items-center justify-center w-full h-full">
            <TouchableOpacity
            onPress={()=>{
                ship.state="arrived"
                setShip(ship)
                setModalVisible(false);
            }}>
        <View className="flex items-center justify-center w-[30vh] m-5  h-[8vh] bg-lime-600" value="Arrived">
            <Text className="font-pregulare text-white">Consegnato</Text></View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
                ship.state="incoming"
                setShip(ship);
                setModalVisible(false);
            }}>
        <View className="flex items-center justify-center w-[30vh] m-5  h-[8vh] bg-yellow-300" value="Arrived">
            <Text className="font-pregulare text-white">In Arrivo</Text></View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
                ship.state="retard"
                setShip(ship);
                setModalVisible(false);
            }}>
        <View className="flex items-center justify-center w-[30vh] m-5  h-[8vh] bg-red-500" value="Arrived">
            <Text className="font-pregulare text-white">Non Consegnato</Text></View>
            </TouchableOpacity>
        </View>
      </Modal>
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

export default EditShip

const styles = StyleSheet.create({})