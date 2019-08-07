import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const ButtonStyle = StyleSheet.create({
   large: {
    backgroundColor: '#083451',
    borderColor: '#083451',
    borderRadius: 50,
    borderWidth: 1,
    elevation: 20
   },
   medium: {
      backgroundColor: '#083451',
      borderColor: '#083451',
      borderRadius: 50,
      borderWidth: 1,
      elevation: 20,
      width: width/2
   },
   small: {
       
   },
   large_text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
   },
   medium_text: {

   },
   small_text: {

   }
})

export { ButtonStyle }