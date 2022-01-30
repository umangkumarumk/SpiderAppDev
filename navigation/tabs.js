import React from 'react';
//import { StyleSheet, Text, View , ScrollView, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StopWatch from '../screens/StopWatch';
import Alarm from '../screens/Alarm';
import Timer from '../screens/Timer';


const Tab =createBottomTabNavigator();

const Tabs =() => {
    return(
        <Tab.Navigator screenOptions={{
            showLabel:true,
            style:{
                position:'absolute',
                
                bottom:25,
                left:20,
                right:20,
                elevation:0,
                backgroundColor:'white',
                borderRadius:15,
                height:30,
                
            }
        }}>
            <Tab.Screen name="Alarm" component={Alarm}/>
            <Tab.Screen name="StopWatch" component={StopWatch}/>
            <Tab.Screen name="Timer" component={Timer}/>
        </Tab.Navigator>

    );
}

export default Tabs;
