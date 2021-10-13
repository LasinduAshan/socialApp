import { StyleSheet } from "react-native";
import COLORS from "../consts/color";
// import COLORS from '../../consts/color';


const STYLES = StyleSheet.create({
    inputContainer: {flexDirection: 'row', marginTop: 20},
    inputIcon: {
        marginTop: 15,
        position: 'absolute',
    },
    input: {
        color: COLORS.light,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        flex: 1,
        fontSize: 18,
    },
    input2: {
        color: COLORS.light,
        paddingLeft: 30,
        borderBottomWidth: 0.8,
        flex: 1,
        fontSize: 18,
    },
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 50,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    line: {
        backgroundColor: COLORS.light,
        height: 1.1,
        width: 30,
    },
    btnSecondary: {
        borderColor: COLORS.light,
        height: 50,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    imageFacebook: {
        width: 25,
        height:25,
        marginLeft: 5,
    },
    imageGoogle: {
        width: 25,
        height:25,
        marginLeft: 5,
    },
    profileContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileContainerView: {
        backgroundColor: COLORS.light,
        width: 100,
        height: 100,
        borderRadius: 50,
        flexDirection: 'row',
       
    },
    profileContainerView1: {
        backgroundColor: COLORS.light,
        width: 100,
        height: 100,
        borderRadius: 40,
        flexDirection: 'row',
       
    },
    avaterProfile: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
});

export default STYLES;