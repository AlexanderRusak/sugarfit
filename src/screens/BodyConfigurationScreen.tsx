import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SelectSection } from '../components/settings/SelectSection';
import { ButtonSection } from '../components/settings/ButtonSection';
import { theme } from '../styles/theme';
import { ParameterParams } from './BodyParameterScreen';
import { BodyParameters } from '../store/types/settingsParameters';
import { STORAGE_KEYS } from '../storage/constants';
import { setDataToStorage } from '../storage/storageHelpers';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loadBodyParameters, saveBodyParameters } from '../store/actions/bodyParameters';
import { Dispatch } from 'redux';
import { IStore } from '../store';
import { isFullBodyParameters } from '../logic/helpers/helpers';


export const BodyConfigurationScreen = ({ navigation }: any) => {

  const isFocused = useIsFocused();
  const { data: bodyParameters } = useSelector((store: IStore) => store.bodyParameters)
  const dispatch = useDispatch<Dispatch<any>>()
  const [bodyParametersState, setBodyParametersState] = useState<BodyParameters>(bodyParameters[bodyParameters.length - 1]);

  useEffect(() => {
    const getBodyParameters = async () => {
      if (bodyParameters.length) {
        setBodyParametersState(bodyParameters[bodyParameters.length - 1])
      } else {
        dispatch(loadBodyParameters());
      }
    }
    getBodyParameters();
  }, [bodyParameters]);

  useEffect(() => {
    dispatch(loadBodyParameters());
  }, [isFocused])


  const handleSection = useCallback((data: string) => {
    const lastBodyDataParameter = bodyParameters[bodyParameters.length - 1];
    console.log(lastBodyDataParameter, 'before sex', isFullBodyParameters(lastBodyDataParameter),);

    isFullBodyParameters(lastBodyDataParameter) ? dispatch(saveBodyParameters([...bodyParameters, { ...bodyParametersState, 'sex': data }])) :
      dispatch(saveBodyParameters([
        {
          ...lastBodyDataParameter,
          'sex': data
        }
      ]))

    setBodyParametersState({ ...bodyParametersState, 'sex': data });

  }, [bodyParametersState, navigation])

  const handleScreen = (nameScreen: string, data: number) => {

    bodyParametersState && navigation.navigate(nameScreen, {
      isMeasuring: !!["Weigh", "Height"].find((name) => name === nameScreen),
      type: nameScreen.toLowerCase(),
      data,
      bodyData: bodyParameters
    } as unknown as ParameterParams);
  }

  return (
    <View style={styles.container}>
      {bodyParametersState ? <><ButtonSection title='Age' defaultValue={bodyParametersState ? bodyParametersState.age : 0} handleScreen={handleScreen} />
        <SelectSection title='Sex' defaultValue={bodyParametersState.sex} dropDownArray={['Male', 'Female']} handleSelect={handleSection} />
        <ButtonSection title='Weigh' defaultValue={bodyParametersState ? bodyParametersState.weigh : 0} handleScreen={handleScreen} />
        <ButtonSection title='Height' defaultValue={bodyParametersState ? bodyParametersState.height : 0} handleScreen={handleScreen} />
      </>
        : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
});
