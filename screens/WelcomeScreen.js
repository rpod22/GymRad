import React from 'react';
import { COLORS } from '../colors';
import { View, Text, Button, TouchableOpacity ,StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient 
            colors={COLORS.gradient}
            locations={[0.4, 0.6, 1]}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
        >
            <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logoImage}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('TrainingPlans')}
                    >
                        <Text style={styles.buttonText}>Rozpocznij</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    logoImage: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 50,
        elevation: 2,
        marginTop: 20
    },
    buttonText: {
        color: COLORS.primaryBg,
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});

export default WelcomeScreen;