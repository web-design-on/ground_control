import HealthStatsCards from '@/components/HealthStatsCards';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

function getTimeGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}

export default function HomeScreen() {
    const greeting = getTimeGreeting();

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={styles.mainTitle}>{greeting}, Breno</Text>
                <Text style={styles.subtitle}>Venha completar seus desafios para uma ótima recompensa!</Text>
            </View>

            <View style={styles.activitiesContainer}>
                <View style={styles.selfCare}>
                    <Image
                        style={styles.cardImage}
                        source={require('../../assets/images/home/self_care.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.cardTitle}>Auto Cuidado</Text>
                    <Text style={styles.cardCategory}>CURSO</Text>
                    <View style={styles.cardButton}>
                        <Text style={styles.cardButtonText}>INICIAR</Text>
                    </View>
                </View>

                <View style={styles.relaxation}>
                    <Image
                        style={styles.cardImage}
                        source={require('../../assets/images/home/relaxation.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.cardTitleDark}>Relaxamento</Text>
                    <Text style={styles.cardCategoryDark}>RESPIRAÇÃO  •  3-10 MIN</Text>
                    <View style={styles.cardButtonDark}>
                        <Text style={styles.cardButtonTextDark}>INICIAR</Text>
                    </View>
                </View>
            </View>

            <ImageBackground
                style={styles.thought}
                source={require('../../assets/images/home/bg_thought_of_the_day.png')}
                resizeMode="cover"
                borderRadius={12}
            >
                <View style={styles.thoughtContent}>
                    <View style={styles.thoughtMeta}>
                        <Text style={styles.thoughtTitle}>Pensamento do Dia</Text>
                        <Text style={styles.thoughtMetaText}>MEDITAÇÃO  •  3-10 MIN</Text>
                    </View>
                </View>
            </ImageBackground>

            <Text style={styles.secondaryTitle}>Acompanhe sua saúde</Text>

            <HealthStatsCards
                score={80}
                scoreMax={100}
                sentiment="Triste"
                moodBars={[2, 4, 6, 9, 7, 5, 8, 6]}
                trackedDays={31}
                totalDays={365}
            />

            <View style={styles.moodContainer}>
                <View style={styles.moodHeader}>
                    <Text style={styles.moodTitle}>Histórico de Humor</Text>
                </View>
                <View style={styles.moodRow}>
                    {[
                        { day: 'Seg', src: require('../../assets/images/emotions/bad.png') },
                        { day: 'Ter', src: require('../../assets/images/emotions/good.png') },
                        { day: 'Qua', src: require('../../assets/images/emotions/neutral.png') },
                        { day: 'Qui', src: require('../../assets/images/emotions/great.png') },
                        { day: 'Sex', src: require('../../assets/images/emotions/terrible.png') },
                        { day: 'Sáb', src: require('../../assets/images/emotions/great.png') },
                        { day: 'Dom', src: require('../../assets/images/emotions/neutral.png') },
                    ].map(({ day, src }) => (
                        <View key={day} style={styles.moodItem}>
                            <Image style={styles.moodIcon} source={src} />
                            <Text style={styles.moodDay}>{day}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FAF8F5',
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 52,
        paddingBottom: 32,
        gap: 16,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#3F414E',
        marginBottom: 4,
    },
    subtitle: {
        color: '#A1A4B2',
        fontSize: 16,
        lineHeight: 22,
    },
    secondaryTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#3F414E',
        marginTop: 4,
    },
    activitiesContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    selfCare: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#8E97FD',
        padding: 16,
        minHeight: 180,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    relaxation: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#FFC97E',
        padding: 16,
        minHeight: 180,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    cardImage: {
        position: 'absolute',
        top: -12,
        right: 0,
        width: 80,
        height: 80,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    cardTitleDark: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3F414E',
        marginBottom: 2,
    },
    cardCategoryDark: {
        fontSize: 9,
        fontWeight: '600',
        color: 'rgba(63,65,78,0.8)',
        letterSpacing: 0.8,
        marginBottom: 16,
    },
    cardCategory: {
        fontSize: 9,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 0.8,
        marginBottom: 16,
    },
    cardButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 4,
    },
    cardButtonDark: {
        alignSelf: 'flex-end',
        backgroundColor: '#3F414E',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 4,
    },
    cardButtonText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#333242',
        letterSpacing: 0.5,
    },
    cardButtonTextDark: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    thought: {
        backgroundColor: '#333242',
        borderRadius: 12,
        padding: 24,
    },
    thoughtContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    thoughtMeta: {
        flex: 1,
    },
    thoughtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    thoughtMetaText: {
        fontSize: 11,
        color: '#EBEAEC',
        letterSpacing: 0.5,
    },
    moodContainer: {
        borderWidth: 1,
        borderColor: '#E6E1F2',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
    },
    moodHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    moodTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#3F414E',
    },
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    moodItem: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
    },
    moodIcon: {
        width: 36,
        height: 36,
    },
    moodDay: {
        fontSize: 12,
        color: '#A1A4B2',
    },
});