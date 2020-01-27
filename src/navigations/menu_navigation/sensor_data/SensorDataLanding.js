import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import RainGaugeSensorScreen from '../../../components/layout/menu/sensor_data/RainGaugeSensorScreen';
import SubsurfaceSensorScreen from '../../../components/layout/menu/sensor_data/SubsurfaceSensorScreen';
import EarthquakeSensorScreen from '../../../components/layout/menu/sensor_data/EarthquakeSensorScreen';

let {height} = Dimensions.get('window');

const SensorData = createMaterialTopTabNavigator({
    RainGaugeSensor: {
        screen: RainGaugeSensorScreen,
        navigationOptions: {
            tabBarLabel: 'Rain Gauge'
        },
    },
    SubsurfaceSensor: {
        screen: SubsurfaceSensorScreen,
        navigationOptions: {
            tabBarLabel: 'Subsurface Sensor'
        },
    },
    EarthquakeSensor: {
        screen: EarthquakeSensorScreen,
        navigationOptions: {
            tabBarLabel: 'Earthquake Sensor'
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

export default createAppContainer(SensorData);