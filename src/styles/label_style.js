import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const LabelStyle = StyleSheet.create({
   large_label: {

   },
   medium_label: {

   },
   small_label: {
       
   },
   info: {

   },
   warning: {

   },
   success: {
       
   },
   notice: {
       
   }
})

export { LabelStyle }