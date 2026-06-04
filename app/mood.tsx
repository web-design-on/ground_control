import { PrimaryButton } from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

interface EmotionButtonProps {
    emotion: { key: string; source: any };
    selected: boolean;
    onPress: () => void;
}

function EmotionButton({ emotion, selected, onPress }: EmotionButtonProps) {
    const emotionStyles = {
        terrible: { backgroundColor: '#d6ceff' },
        bad: { backgroundColor: '#ffc7ae' },
        neutral: { backgroundColor: '#ebd9d0' },
        good: { backgroundColor: '#feebbe' },
        great: { backgroundColor: '#d8e9ae' },
    };

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.emotionButton,
                selected && [ emotionStyles[emotion.key as keyof typeof emotionStyles]]
            ]}
        >
            <Image
                source={emotion.source}
                style={styles.emotionIcon}
                resizeMode="contain"
            />
        </Pressable>
    );
}

export default function MoodScreen() {
    const router = useRouter();
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    const emotions = [
        { key: 'terrible', source: require('../assets/images/emotions/terrible.png') },
        { key: 'bad', source: require('../assets/images/emotions/bad.png') },
        { key: 'neutral', source: require('../assets/images/emotions/neutral.png') },
        { key: 'good', source: require('../assets/images/emotions/good.png') },
        { key: 'great', source: require('../assets/images/emotions/great.png') },
    ];

    const handleSubmit = () => {
        router.push('/(tabs)/home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Antes de ir,</Text>
                <Text style={styles.subtitle}>
                    como está seu humor hoje?
                </Text>

                <View style={styles.emotions}>
                    {emotions.map((emotion) => (
                        <EmotionButton
                            key={emotion.key}
                            emotion={emotion}
                            selected={selectedEmotion === emotion.key}
                            onPress={() => setSelectedEmotion(emotion.key)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.illustrationContainer}>
                <ImageBackground
                    source={require('../assets/images/mood/moon.png')}
                    resizeMode="contain"
                    style={styles.moon}
                >
                    <Image
                        source={require('../assets/images/mood/astronaut.png')}
                        style={styles.astronaut}
                        resizeMode="contain"
                    />
                </ImageBackground>
            </View>

            <View style={styles.footer}>
                <PrimaryButton
                    title="ENVIAR"
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF8F5',
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        paddingTop: 50,
    },

    title: {
        fontSize: 36,
        fontWeight: '700',
    },

    subtitle: {
        fontSize: 24,
        marginTop: 4,
    },

    emotions: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 20,
    },

    illustrationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxHeight: 300,
        marginVertical: 32,
    },

    moon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 1.3 }],
    },

    emotionIcon: {
        width: 45,
        height: 45,
        borderRadius: 30,
    },

    emotionButton: {
        borderRadius: 40,
        padding: 8,
        backgroundColor: 'transparent',
    },

    astronaut: {
        width: '100%',
        height: 220,
    },

    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
});