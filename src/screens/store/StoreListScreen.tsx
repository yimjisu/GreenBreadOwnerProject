import React from "react";
import StoreList from "./components/StoreList";
import { View,ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackNavigator";
type Props = NativeStackScreenProps<RootStackParamList, 'StoreList'>;
const HomeScreen: React.FC<Props> = ({navigation}) => {
    return (
    <ScrollView>
        <StoreList navigation={navigation} title='NOW' now state='open'/>
        <StoreList navigation={navigation} title='Coming Soon' state='ready'/>
        {/* <ReviewListScreen /> */}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: 50,
        width: 50,
        alignSelf: 'center',
    },
    title : {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        paddingTop: 20,
    }
});

export default HomeScreen;