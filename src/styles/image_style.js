import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const ImageStyle = StyleSheet.create({
   seal: {
      height: height * 0.12,
      width: width * 0.23,
   },
   hazard_maps: {
      marginTop: '5%',
      marginBottom: '5%',
      height: width * 0.637,
      width: '100%',
      backgroundColor: '#e1e4e8'
   },
   graphs: {
      marginTop: '5%',
      marginBottom: '5%',
      height: width * 0.637,
      width: '100%',
      backgroundColor: '#e1e4e8',
   },
   background: {
    flex: 1,
   },
   backdrop: {

   },
})

export { ImageStyle }