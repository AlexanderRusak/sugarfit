import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { MainScreen } from '../screens/MainScreen';
import { theme } from '../styles/theme';
import { BodyConfigurationScreen } from '../screens/BodyConfigurationScreen';
import { BodyParameter } from '../screens/BodyParameterScreen';
import { Age, BodyConfiguration, BodyParameters, Height, Settings, Weigh } from '../constants/screens/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromStorage, setDataToStorage } from '../storage/storageHelpers';
import { STORAGE_KEYS } from '../storage/constants';
import { initialBodyParameters, initialSettings } from '../storage/inititalStates';
import { saveSettingsParameters } from '../store/actions/settingsParameter';
import { Dispatch } from '@reduxjs/toolkit';
import { BodyParameters as BodyType, SettingsParameters } from '../store/types/settingsParameters';
import { ThemeContext } from '../context/ThemeContext';
import { IStore } from '../store';
import { loadBodyParameters, saveBodyParameters } from '../store/actions/bodyParameters';
import { isPushToSetting } from '../logic/helpers/helpers';




export const MainEntry = () => {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch<Dispatch<any>>();

  const { themeColor, setThemeColor } = useContext(ThemeContext)

  useEffect(() => {
    const getData = async () => {
      const data = await getDataFromStorage(STORAGE_KEYS.SetingsParameters)

      if (!data) {
        setDataToStorage(STORAGE_KEYS.SetingsParameters, initialSettings);
        getData();
      } else {
        const { color, energy, language } = data as SettingsParameters
        dispatch(saveSettingsParameters({ color, energy, language }));
        setThemeColor(color)
      }
    }
    getData();
  });


  useEffect(() => {
    dispatch(loadBodyParameters());
    /* dispatch(saveBodyParameters([initialBodyParameters])) */
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: themeColor,
            },
            headerTitle: '',
          }}
        >
          <Stack.Screen
            name='BloodGym' component={MainScreen} />
          <Stack.Screen
            options={{
              headerBackTitle: 'Body Configuration',
              headerBackTitleStyle: {
                fontSize: theme.backNavigationFontSize,
              },
              headerTintColor: theme.colors.WHITE
            }}

            name={BodyConfiguration} component={BodyConfigurationScreen} />
          <Stack.Screen
            options={{
              headerBackTitle: BodyParameters,
              headerBackTitleStyle: {
                fontSize: theme.backNavigationFontSize,
              },
              headerTintColor: theme.colors.WHITE
            }}
            name={Age} component={BodyParameter} />
          <Stack.Screen
            options={{
              headerBackTitle: BodyParameters,
              headerBackTitleStyle: {
                fontSize: theme.backNavigationFontSize,
              },
              headerTintColor: theme.colors.WHITE
            }}
            name={Weigh} component={BodyParameter} />
          <Stack.Screen
            options={{
              headerBackTitle: BodyParameters,
              headerBackTitleStyle: {
                fontSize: theme.backNavigationFontSize,
              },
              headerTintColor: theme.colors.WHITE
            }}
            name={Height} component={BodyParameter} />
        </Stack.Navigator>
      </NavigationContainer>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
