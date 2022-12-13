import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import OrangeButton from '../../components/buttons/LightBlueButton';
import PublicText from '../../components/common/PublicText';
import Logo from '../../components/layout/Logo';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import CustomTextInput from './components/CustomTextInput';
import {signIn, resultMessages, signOut} from '../../../lib/auth';
import userTokenState from '../../atoms/userTokenState';
import firestore from '@react-native-firebase/firestore';
import { useSetRecoilState } from 'recoil';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setUserTokenState = useSetRecoilState(userTokenState);

  const onSignIn = useCallback(async () => {
    try {
      if (id == '' || password == '') return;
      const token = await signIn(id, password);
      const doc = await firestore().collection('user').doc(token).get();
      if (doc.exists && doc.data().owner) {
        const id = doc.data().storeId;
        await AsyncStorage.setItem('token', id);
        setUserTokenState(id);
      } else {
        Alert.alert('로그인 실패', '등록된 사용자가 아닙니다');
        signOut();
      }
    } catch (error) {
      console.log(error);
      const alertMessage = resultMessages[e.code]
        ? resultMessages[e.code]
        : '알 수 없는 이유로 로그인에 실패하였습니다.';
      Alert.alert('로그인 실패', alertMessage);
    }

    // navigation.navigate('ClubList');
  }, [navigation, id, password]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <PublicText>그린브래드 사장님</PublicText>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Logo />
        <PublicText style={styles.labelText}>아이디</PublicText>
        <CustomTextInput
          placeholder="아이디를 입력하세요."
          value={id}
          style={styles.idInput}
          onChangeText={text => {
            setId(text);
          }}
        />
        <PublicText style={styles.labelText}>비밀번호</PublicText>
        <CustomTextInput
          placeholder="비밀번호를 입력하세요."
          value={password}
          style={styles.passwordInput}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <OrangeButton title="로그인" onPress={onSignIn} />
        <View style={styles.signUpContainer}>
          <PublicText style={styles.infoText}>
            Green Bread가 처음이신가요?
          </PublicText>
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
            <PublicText style={styles.signUpText}>회원 가입</PublicText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
  },
  rootContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  idInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: '#FC6D26',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  signUpText: {
    color: '#FC6D26',
  },
  infoText: {
    color: 'gray',
  },
  signUpButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default SignInScreen;
