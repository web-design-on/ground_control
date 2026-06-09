import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safe}>

                <View style={styles.topArea}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/images/astronautonboarding.png')}
                        style={styles.astronaut}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.bottomArea}>
                    <Text style={styles.title}>Mantenha sua órbita em equilíbrio</Text>
                    <Text style={styles.description}>
                        Complete atividades rápidas de bem-estar{'\n'}e cuide da sua saúde mental durante a missão.
                    </Text>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => router.push('/(auth)/register')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.primaryBtnText}>CADASTRE-SE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/login')}
                        style={styles.loginLink}
                    >
                        <Text style={styles.loginLinkText}>
                            JÁ TEM UMA CONTA?{' '}
                            <Text style={styles.loginLinkBold}>ENTRE</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,     
        paddingTop: 52,
        paddingBottom: 32,
    },
    safe: {
        flex: 1,
    },
    topArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 24,
    },
    logo: {
        width: 160,
        height: 70,
        marginBottom: 40,
    },
    astronaut: {
        width: width * 1.70,
        height: width * 0.70,
    },
    bottomArea: {
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.navy,
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: colors.textLight,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 52,
    },
    primaryBtn: {
        backgroundColor: colors.navy,
        borderRadius: 100,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    primaryBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1.5,
    },
    loginLink: {
        marginTop: 8,
    },
    loginLinkText: {
        fontSize: 13,
        color: colors.textLight,
        letterSpacing: 0.5,
    },
    loginLinkBold: {
        color: colors.navy,
        fontWeight: '800',
    },
});
