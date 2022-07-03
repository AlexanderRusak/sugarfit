import React, { useContext, useEffect } from 'react';
import { FontAwesome5, SimpleLineIcons, Fontisto } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StyleSheet, View } from 'react-native';
import { GraphsScreen } from './GraphsScreen';
import { SettingsScreen } from './SettingsScreen';
import { SummaryScreen } from './SummaryScreen';
import { WorkoutScreen } from './WorkoutScreen';
import { theme } from '../styles/theme';
import { BodyConfiguration, Graphs, Settings, Summary, Workout } from '../constants/screens/screens';
import { ThemeContext } from '../context/ThemeContext';
import { useSelector } from 'react-redux';
import { IStore } from '../store';
import { Route, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { isPushToSetting } from '../logic/helpers/helpers';


export const MainScreen = () => {

  const { themeColor } = useContext(ThemeContext);
  const { navigate } = useNavigation()

  const { data } = useSelector((store: IStore) => store.bodyParameters);
  const isFocused = useIsFocused();

  useEffect(() => {
    data.length && isPushToSetting(data[0], navigate)
  }, [isFocused])


  const BottomTabs = createMaterialBottomTabNavigator();
  const bottomTabsComponent = <BottomTabs.Navigator
    screenOptions={{
      tabBarColor: themeColor
    }}
  >
    <BottomTabs.Screen
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={theme.colors.WHITE} />
      }}
      name={Summary} component={SummaryScreen} />
    <BottomTabs.Screen
      options={{
        tabBarIcon: ({ color }) => <SimpleLineIcons name="graph" size={24} color={theme.colors.WHITE} />
      }}
      name={Graphs} component={GraphsScreen} />
    <BottomTabs.Screen
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 name="running" size={24} color={theme.colors.WHITE} />
      }}
      name={Workout} component={WorkoutScreen} />
    <BottomTabs.Screen
      options={{
        tabBarIcon: ({ color }) => <Fontisto name="player-settings" size={24} color={theme.colors.WHITE} />
      }}
      name={Settings} component={SettingsScreen} />
  </BottomTabs.Navigator>

  return (
    <View style={styles.mainScreen}>
      {bottomTabsComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});
