import React, { useEffect } from 'react'
import {View,Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'



export default function Login() {
  const[email,setEmail]= useState('')
  const[password,setPassword]= useState('')

  const navigation = useNavigation()

  useEffect(()=>{
    const unsubscribe= authentication.onAuthStateChanged(user =>{
      if(user){
        navigation.navigate("Home")
      }
    })
    return unsubscribe

    
  }, [])

  const LoginUser = ()=>{
    signInWithEmailAndPassword(authentication,email,password)
    .then((re)=>{
      console.log(re);
    })
    .catch((re)=>{
      console.log
    })
    setEmail('')
    setPassword('')
    
  }
  return (
      <View style={styles.container}>

        <View styles>


          <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Login</Text>
          </View>
          
          <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
          <TextInput style={styles.input} placeholder='Password'value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>

          <TouchableOpacity onPress={LoginUser} style={styles.buttonContainer}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        
        </View>
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
  majorContainer:{

  },
  loginText:{
      fontSize:60,
      color:'#6b23de'
  },
  loginTextContainer:{
      marginBottom:30
  },
  input:{
      borderBottomWidth:2,
      borderBottomColor:'#6b23de',
      fontSize:20,
      height:55 ,
      marginVertical:10
  },
  forgotPassword:{
      alignSelf:'flex-end',
      marginVertical:5,
      color:'#0853a8'
  },
  buttonContainer:{
      height:50,
      backgroundColor:'#6b23de',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      marginVertical:50,
      color:'white'


  },
  loginButtonText:{
      color:'white',
      fontSize:25,
      

  },
  noAccountContainer:{
      flexDirection:'row',
      justifyContent:'center'
  },
  noAccountText:{
      marginRight:10,
      fontSize:16
  },
  signUpText:{
      fontSize:16,
      color:'#6b23de'
  }

})





