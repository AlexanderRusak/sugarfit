import { BodyConfiguration } from '../../constants/screens/screens';
import { BodyParameters } from '../../store/types/settingsParameters';

export const isPushToSetting = ({ age, height, sex }: BodyParameters,
  navigation: (route: string) => void) => {
  console.log(age, height, sex);

  if (!(Boolean(age) && Boolean(height) && Boolean(sex))) {
    navigation(BodyConfiguration);
  }
}