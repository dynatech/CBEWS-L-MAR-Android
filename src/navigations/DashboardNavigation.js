import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import CommunityRiskAssessment from './menu_navigation/community_risk_assessment/CommunityRiskAssessmentLanding';
import AlertGeneration from './menu_navigation/alert_generation/AlertGenerationLanding';
import DataAnalysis from './menu_navigation/data_analysis/DataAnalysisLanding';
import GroundData from './menu_navigation/ground_data/GroundDataLanding';
import SensorData from './menu_navigation/sensor_data/SensorDataLanding';
import Maintenance from './menu_navigation/maintenance/MaintenanceLanding';
import Events from './menu_navigation/events/EventsLanding';
import DataSyncScreen from '../components/layout/menu/data_sync/DataSyncScreen'; 
import DashboardScreen from '../components/layout/DashboardScreen';

const DashboardNavigation = createStackNavigator({
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    CommunityRiskAssessment: {
        screen: CommunityRiskAssessment,
        navigationOptions: {
            headerShown: false
        }
    },
    AlertGeneration: {
        screen: AlertGeneration,
        navigationOptions: {
            headerShown: false
        }
    },
    DataAnalysis: {
        screen: DataAnalysis,
        navigationOptions: {
            headerShown: false
        }
    },
    GroundData: {
        screen: GroundData,
        navigationOptions: {
            headerShown: false
        }
    },
    SensorData: {
        screen: SensorData,
        navigationOptions: {
            headerShown: false
        }
    },
    Maintenance: {
        screen: Maintenance,
        navigationOptions: {
            headerShown: false
        }
    },
    Events: {
        screen: Events,
        navigationOptions: {
            headerShown: false
        }
    },
    DataSync: {
        screen: DataSyncScreen,
        navigationOptions: {
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#083451'
            },
            headerLeft: null,
            title:'Data Synchronization',
        }
    }
});
export default createAppContainer(DashboardNavigation);
