import React from 'react'
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'


//we will import firestore to firebase .config

export default function ProfileScreen() {

  const navigation= useNavigation()

  
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
          <Text>Profile</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        {/* Sign Out fun  */}

          {/* Tab Navigator */}
          <View style={styles.navBarContainer}>
            
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
  navBarContainer:{
    marginTop:600
  }
})
