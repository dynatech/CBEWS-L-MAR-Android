import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

let { width } = Dimensions.get('window');
let { height } = Dimensions.get('window');

const LabelStyle = StyleSheet.create({
   large_label: {
      fontSize: width * 0.06,
   },
   medium_label: {
      fontSize: width * 0.04,
   },
   small_label: {
      fontSize: width * 0.03,
   },
   info: {

   },
   warning: {

   },
   link: {
      color: '#8bc4f0'
   },
   success: {

   },
   notice: {

   },
   brand: {
      color: '#083451',
      textAlign: 'center'
   },
   default: {
      color: '#fff',
      textAlign: 'center',
      paddingTop: height * 0.03,
      paddingBottom: height * 0.03,
      textShadowColor: '#000',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 10
   },
   branding: {
      color: '#083451',
      textAlign: 'center',
      paddingBottom: height * 0.03,
   }
})

export { LabelStyle }