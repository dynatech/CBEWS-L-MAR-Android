import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const ImageStyle = StyleSheet.create({
   seal: {
      height: height * 0.12,
      width: width * 0.23,
   },
   background: {
    flex: 1,
   },
   backdrop: {

   },
})

export { ImageStyle }