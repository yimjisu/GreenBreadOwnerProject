import {View} from 'react-native';
import PublicText from '../../components/common/PublicText';
import ScreenContainer from '../../components/layout/ScreenContainer';
import React, {useCallback} from 'react';
import OrangeButton from '../../components/buttons/LightBlueButton';
import {signOut} from '../../../lib/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userTokenState from '../../atoms/userTokenState';
import {useRecoilState} from 'recoil';


const SettingScreen: React.FC<Props> = ({navigation}) => {
  const [userTokenStateValue, setUserTokenState] = useRecoilState(userTokenState);
  const onSignOut = useCallback(async () => {
    // todo: 네트워킹
    try {
      signOut();
      await AsyncStorage.removeItem('token');
      setUserTokenState(null);
    } catch (e) {
      console.log(e);
    }
  }, [navigation]);

  return (
    <ScreenContainer>
      <View>
        <PublicText>setting</PublicText>
        <OrangeButton title="로그아웃" onPress={onSignOut} />
      </View>
    </ScreenContainer>
  );
};

export default SettingScreen;
