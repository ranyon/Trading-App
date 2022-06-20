import React from 'react'
import { View ,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

 
export default function NavBar() {

  const navigation= useNavigation()

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text>H</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
        <Text>P</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text>S</Text>
        </TouchableOpacity>

        
    </View>
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
