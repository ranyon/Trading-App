import React from 'react'
import { View ,Text,StyleSheet} from 'react-native'
 
export default function NavBar() {
  return (
    <View style={styles.container}>
        <Text>H</Text>
        <Text>P</Text>
        <Text>S</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flexDirection:'row'
  }
})
