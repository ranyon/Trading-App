import React from 'react'
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native'
import NavBar from '../../components/firebaseConfig/screenComponents/navBar'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'


//we will import firestore to firebase .config

export default function ShopScreen() {
    <View>
        <Text>Shop</Text>
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
