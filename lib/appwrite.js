import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import React, { useState } from 'react';
export const config = {

    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.rendev.utilsapp",
    projectID: "669b8349001edf3e2efc",
    databaseID: "669b8937000ae0078ce6",
    userCollectionID: "669b899d00393d879d44",
    postCollectionID: "669b8a1a002af07bb297",
    storageID: "669b8bc3000181b19452",
    shipID:"669c0054000de6e2f959"
}


let client;
let account;
//Inizializza react-native SDK
client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)
  .setPlatform(config.platform);

account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

  export const login = async (email, password) => {
    try {
       const session = await account.createEmailPasswordSession(email, password);
       return session;
    } catch (error) {
        console.log(error)
    }
    
  }

 export const register = async (email, password, name) => {
    try {
     
    const NewAccount = await account.create(ID.unique(), email, password, name);
      
    if(!NewAccount) throw Error;
    const avatarUrl = avatars.getInitials(name);
    await login(email, password); 
    let userToADD = {accountId: NewAccount.$id, username:name,email:NewAccount.email, avatar:avatarUrl}
    
    const NewUser = databases.createDocument(
        config.databaseID,
        config.userCollectionID,
        ID.unique(),
        userToADD
    ) 
    return NewUser;
    } catch (error) {
        
    }
  }

export const getCurrentUser = async () =>{
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;
        const currentUser = databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return (await currentUser).documents[0];
    
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () =>{
    try {
        const post = await databases.listDocuments(
            config.databaseID,
            config.postCollectionID
        )
       
        return post.documents;
    } catch (error) {
        console.log(error)
    }
}
export const getAllShips = async () =>{
    try {
        const post = await databases.listDocuments(
            config.databaseID,
            config.shipID
        )
       
        return post.documents;
    } catch (error) {
        console.log(error)
    }
}
const styles = StyleSheet.create({
    // ... define some tyles
});

