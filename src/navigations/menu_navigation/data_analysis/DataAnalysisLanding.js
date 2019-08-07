import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import RainfallPlotScreen from '../../../components/layout/menu/data_analysis/RainfallPlotScreen';
import SubsurfacePlotScreen from '../../../components/layout/menu/data_analysis/SubsurfacePlotScreen';
import SurficialPlotScreen from '../../../components/layout/menu/data_analysis/SurficialPlotScreen';

let {height} = Dimensions.get('window');

const DataAnalysis = createMaterialTopTabNavigator({
    RainfallPlot: {
        screen: RainfallPlotScreen,
        navigationOptions: {
            tabBarLabel: 'Rainfall plot'
        },
    },
    SubsurfacePlot: {
        screen: SubsurfacePlotScreen,
        navigationOptions: {
            tabBarLabel: 'Subsurface plot'
        },
    },
    SurficialPlot: {
        screen: SurficialPlotScreen,
        navigationOptions: {
            tabBarLabel: 'Surficial plot'
        },
    },
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height* 0.017,
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

export default createAppContainer(DataAnalysis);