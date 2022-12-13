import auth from '@react-native-firebase/auth';

export async function signIn(email, password) {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  return userCredential.user.uid;
}

export async function signUp({email, password}) {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  console.log(userCredential.user.uid);
  return userCredential.user.uid;
}

export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export async function signOut() {
  return auth().signOut();
}

export const resultMessages = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
};

// // 사용법
// import React, { useState } from "react";
// import { Alert } from "react-native";
// import { signIn, signUp } from "../lib/auth";

// function SignInScreen() {

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//     const resultMessages = {
//         "auth/email-already-in-use": "이미 가입된 이메일입니다.",
//         "auth/wrong-password": "잘못된 비밀번호입니다.",
//         "auth/user-not-found": "존재하지 않는 계정입니다.",
//         "auth/invalid-email": "유효하지 않은 이메일 주소입니다."
//     }

//     const signUpSubmit = async () => { // 회원가입 함수
//         const {email, password} = form;
//         const info = {email, password};
//         try {
//         const {user} = await signUp(info);
//         console.log(user);
//         } catch (e) {
//         const alertMessage = resultMessages[e.code] ?
//             resultMessages[e.code] : "알 수 없는 이유로 회원가입에 실패하였습니다.";
//         Alert.alert("회원가입 실패", alertMessage);
//         }
//     }

//     const signInSubmit = async () => { // 로그인 함수
//         const {email, password} = form;
//         const info = {email, password};
//         try {
//         const {user} = await signIn(info);
//         console.log(user);
//         } catch (e) {
//         const alertMessage = resultMessages[e.code] ?
//             resultMessages[e.code] : "알 수 없는 이유로 로그인에 실패하였습니다.";
//         Alert.alert("로그인 실패", alertMessage);
//         }
//     }

//   return ( ... );

// }

// export default SignInScreen;
