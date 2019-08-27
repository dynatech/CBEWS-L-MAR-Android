import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import SurficialMarkersScreen from '../../../components/layout/menu/ground_data/SurficialMarkersScreen';
import MoMsScreen from '../../../components/layout/menu/ground_data/MoMsScreen';
import ODMonitoringScreen from '../../../components/layout/menu/ground_data/ODMonitoringScreen';

let {height} = Dimensions.get('window');

const GroundData = createMaterialTopTabNavigator({
    SurficialMarkers: {
        screen: SurficialMarkersScreen,
        navigationOptions: {
            tabBarLabel: 'Surficial Markers'
        },
    },
    MoMs: {
        screen: MoMsScreen,
        navigationOptions: {
            tabBarLabel: 'Manifestation of Movements'
        },
    },
    ODMonitoring: {
        screen: ODMonitoringScreen,
        navigationOptions: {
            tabBarLabel: 'On-demand Monitoring'
        },
    },
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height* 0.015,
            alignContent: 'center'
        },
        style: {
            backgroundColor: '#083451',
            height: height* 0.08,
        },
        indicatorStyle: {
            backgroundColor: '#f27e10'
        }
    }
});

export default createAppContainer(GroundData);