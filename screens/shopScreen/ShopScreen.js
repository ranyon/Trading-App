import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import NavBar from '../screenComponents/navBar'
// import { useNavigation } from '@react-navigation/native'
// import { signOut } from 'firebase/auth'


//we will import firestore to firebase .config

export default function ShopScreen() {
    <View style={styles.container}>
        <Text>Shop</Text>
        <View style={styles.navBarContainer}>
            <NavBar/>
        </View>
    </View>
  
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
