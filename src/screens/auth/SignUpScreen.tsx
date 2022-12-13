import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {useMemo} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import CancelButton from '../../components/buttons/CancelButton';
import OrangeButton from '../../components/buttons/LightBlueButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {RootStackParamList} from '../RootStackNavigator';
import CustomTextInput from './components/CustomTextInput';
import {signUp, resultMessages} from '../../../lib/auth';
import Logo from '../../components/layout/Logo';
import PublicText from '../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');

  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordre = useCallback((text: string) => {
    setPasswordRe(text);
  }, []);

  const disabled = useMemo(() => {
    return password === '' || passwordRe === '' || password !== passwordRe;
  }, [password, passwordRe]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSignUp = useCallback(async () => {
    // todo: 네트워킹
    try {
      // TODO
      // const response = await fetch('http://localhost:8091/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     Accepts: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId: id,
      //     userName: name,
      //     upassword: password,
      //     email: email,
      //   }),
      // });
      // const responseData = await response.json();
      // console.log('responseData', responseData);
      const user = await signUp({password, email});
      firestore().collection('user').doc(user).set({
        owner: true,
        storeId : 'sTIou28KeGsdwCbE4KKn'
      });

      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [navigation, id, name, password, email]);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <CustomTextInput
          placeholder="아이디를 입력하세요."
          style={styles.emailInput}
          value={id}
          onChangeText={onChangeId}
        />
        <CustomTextInput
          placeholder="이름을 입력하세요."
          style={styles.emailInput}
          value={name}
          onChangeText={onChangeName}
        /> */}
        <Logo />
        <PublicText>그린브래드 사장님</PublicText>
         <PublicText style={styles.labelText}>이메일</PublicText>
        <CustomTextInput
          placeholder="이메일을 입력하세요."
          style={styles.emailInput}
          value={email}
          onChangeText={onChangeEmail}
        />
         <PublicText style={styles.labelText}>비밀번호</PublicText>
        <CustomTextInput
          placeholder="비밀번호를 입력하세요."
          secureTextEntry
          style={styles.passwordInput}
          value={password}
          onChangeText={onChangePassword}
        />
         <PublicText style={styles.labelText}>비밀번호 확인</PublicText>
        <CustomTextInput
          placeholder="비밀번호를 확인해주세요."
          secureTextEntry
          style={styles.passwordReInput}
          value={passwordRe}
          onChangeText={onChangePasswordre}
        />
        <OrangeButton
          title="가입하기"
          onPress={onSignUp}
          style={[
            styles.signUpButton,
            {backgroundColor: disabled === true ? '#ccc' : '#FC6D26'},
          ]}
          disabled={disabled}
        />
        
        <CancelButton onPress={onCancel} />
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
  emailInput: {
    marginBottom: 20,
  },
  passwordInput: {
    marginBottom: 20,
  },
  passwordReInput: {
    marginBottom: 20,
  },
  signUpButton: {
    marginBottom: 20,
  },
  labelText: {
    color: '#FC6D26',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  infoText: {
    color: 'gray'
  },
});

export default SignUpScreen;
