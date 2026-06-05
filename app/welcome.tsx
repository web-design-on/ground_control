import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
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

const { width, height } = Dimensions.get('window');

const STARS = [
    { x: 0.08, y: 0.18 }, { x: 0.92, y: 0.22 }, { x: 0.15, y: 0.42 },
    { x: 0.85, y: 0.38 }, { x: 0.05, y: 0.55 }, { x: 0.95, y: 0.60 },
    { x: 0.20, y: 0.72 }, { x: 0.78, y: 0.68 }, { x: 0.50, y: 0.14 },
    { x: 0.35, y: 0.62 }, { x: 0.65, y: 0.25 },
];

export default function WelcomeScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -14, duration: 1800, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.circle3} />
            <View style={styles.circle2} />
            <View style={styles.circle1} />

            {STARS.map((star, i) => (
                <View key={i} style={[styles.star, { left: star.x * width, top: star.y * height }]} />
            ))}

            <SafeAreaView style={styles.safe}>
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <Text style={styles.title}>
                        <Text style={styles.bold}>Olá Breno, bem-vindo{'\n'}</Text>
                        ao Ground Control
                    </Text>
                    <Text style={styles.subtitle}>
                        Explore o app e encontre um espaço{'\n'}de calma e plenitude.
                    </Text>
                </Animated.View>

                <Animated.View style={[styles.astronautWrap, { transform: [{ translateY: floatAnim }] }]}>
                    <Image
                        source={require('../assets/images/astronautaexplicacao.png')}
                        style={styles.astronaut}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Animated.View style={[styles.bottom, { opacity: fadeAnim }]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/(tabs)')}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.buttonText}>COMECE</Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    safe: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 32,
    },
    star: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    circle1: {
        position: 'absolute',
        width: width * 0.75,
        height: width * 0.75,
        borderRadius: width * 0.375,
        backgroundColor: 'rgba(255,255,255,0.18)',
        top: height * 0.28,
        left: width * 0.125,
    },
    circle2: {
        position: 'absolute',
        width: width * 0.95,
        height: width * 0.95,
        borderRadius: width * 0.475,
        backgroundColor: 'rgba(255,255,255,0.1)',
        top: height * 0.23,
        left: width * 0.025,
    },
    circle3: {
        position: 'absolute',
        width: width * 1.15,
        height: width * 1.15,
        borderRadius: width * 0.575,
        backgroundColor: 'rgba(120,125,210,0.4)',
        top: height * 0.18,
        left: width * -0.075,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 64,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: colors.white,
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: 16,
    },
    bold: {
        fontWeight: '800',
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 23,
    },
    astronautWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    astronaut: {
        width: width * 0.80,
        height: width * 0.80,
    },
    bottom: {
        width: '100%',
        paddingHorizontal: 32,
        marginBottom: 24,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 100,
        paddingVertical: 18,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.textDark,
        letterSpacing: 2,
    },
});