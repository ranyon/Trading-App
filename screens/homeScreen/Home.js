import React from 'react'
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export default function Home() {

  const navigation= useNavigation()

  

  const handleSignOut = async ()=>{
    await signOut(authentication).then(()=>{
      console.log("you are logged out")
      navigation.navigate("Login")
    })
    .catch(error => alert(error.message))
  }
  return (
      <View style={styles.container}>

          <Text>Home</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:70
  }
})
