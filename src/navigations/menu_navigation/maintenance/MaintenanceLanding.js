import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import MaintenanceLogsScreen from '../../../components/layout/menu/maintenance/MaintenanceLogsScreen';
import IncidentReportsScreen from '../../../components/layout/menu/maintenance/IncidentReportsScreen';

let {height} = Dimensions.get('window');

const Maintenance = createMaterialTopTabNavigator({
    MaintenanceLogs: {
        screen: MaintenanceLogsScreen,
        navigationOptions: {
            tabBarLabel: 'Maintenance Logs'
        },
    },
    IncidentReports: {
        screen: IncidentReportsScreen,
        navigationOptions: {
            tabBarLabel: 'Incident Reports'
        },
    }
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height * 0.019,
            alignContent: 'center'
        },
        style: {
            backgroundColor: '#083451',
            height: height* 0.07,
        },
        indicatorStyle: {
            backgroundColor: '#f27e10'
        }
    }
});

export default createAppContainer(Maintenance);