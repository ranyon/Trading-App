import React from 'react'
import { View ,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

 
export default function NavBar() {

  const navigation= useNavigation()

  return (
    // navigation 
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.navBarBtnContainer}>H</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.navBarBtnContainer} onPress={()=>navigation.navigate('Profile')}>
        <Text>P</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.navBarBtnContainer} onPress={()=>navigation.navigate('Shop')}>
        <Text>S</Text>
        </TouchableOpacity>
    </View>
      // navigation 
  )
}

const styles= StyleSheet.create({
  container:{
    flexDirection:'row',
    marginHorizontal:10
  },
  navBarBtnContainer:{
    fontSize:10
  }
})
