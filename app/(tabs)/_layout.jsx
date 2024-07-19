import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'

const TabIcon= ({icon,color,name,focused}) =>{
    return(
        <View className="items-center justify-center gap-1">
            <Image source={icon}
            resizeMode='contain'
            tintColor={color}
            className="w-6 h-6"/>
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} tex-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
<>
<Tabs
screenOptions={{
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#CDCDE0',
    tabBarStyle:{
        backgroundColor: '#324aa8',
        borderTopWidth: 1,
        borderTopColor: '#324aa8',
        height:70
    }
}
}>
    <Tabs.Screen 
    name='home' 
    options= {{
        title:'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.home}
            color={color}
            name="Home"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>

    <Tabs.Screen 
    name='explore' 
    options= {{
        title:'explore',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.rightArrow}
            color={color}
            name="Esplora"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>
    <Tabs.Screen 
    name='profile' 
    options= {{
        title:'Profilo',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
            <TabIcon
            icon={icons.profile}
            color={color}
            name="Profilo"
            focused={focused}
            ></TabIcon>
        )
        }}>

    </Tabs.Screen>
</Tabs>
</>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})