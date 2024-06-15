import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    rootHome: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    headerTitle: {
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 3,
    },
    subtitleAdvertance: {
        marginTop: 5,
        marginBottom: 5,
        color: 'red',
    },
    iconEnd: {
        alignItems: 'flex-end',
        flex: 1,
    },
    rootProduct: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
    },
    fabProduct: {
        position: 'absolute',
        bottom: 20,
        right: 15,
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        gap: 10,
    },
});

export default styles;