import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
    <Stack className="">
        <Stack.Screen
        name='sign-in'
        options={{
            headerShown:false
        }}/>

        <Stack.Screen
        name='sign-up'
        options={{
            headerShown:false
        }}/>

    </Stack>
    <StatusBar backgroundColor="#324aa8" style="light" />
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})