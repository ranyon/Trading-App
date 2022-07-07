import React from 'react'
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native'
import NavBar from '../../components/firebaseConfig/screenComponents/navBar'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

//we will import firestore to firebase .config

export default function Home() {

  //tb exported to profile
  const navigation= useNavigation()

  //tb exported to profile
    // Sign Out Handler 
    const handleSignOut = async ()=>{
      await signOut(authentication).then(()=>{
        console.log("you are logged out")
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
      // Sign Out Handler 

  }
  return (
      <View style={styles.container}>
        {/* Sign Out fun  */}
        <View style={styles.homeTextContainer}>
          <Text>Home</Text>
          <Text>Unit one</Text>
          <Text>Unit one</Text>
        </View>


          {/* tb exported to profile  */}
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        {/* Sign Out fun  */}

          {/* Tab Navigator */}
          <View style={styles.navBarContainer}>
            <NavBar/>
          </View>
          {/* Tab Navigator */}
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:70
  },
  homeTextContainer:{
    marginHorizontal:50
  },
  navBarContainer:{
    marginTop:600
  }
})
