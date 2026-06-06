import WeeklyRanking from '@/components/Ranking';
import RankingParticipantCard from '@/components/RankingParticipantCard';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function RankingScreen() {

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={styles.mainTitle}>Acompanhe seu time</Text>
                <Text style={styles.subtitle}>Acompanhe e compita por um melhor score</Text>
            </View>

            <WeeklyRanking
                title="XP da semana"
                participants={[
                    { name: 'Natali S.', xp: [3, 4, 2, 2, 1, 5, 3], color: '#598E9C', isCurrentUser: true },
                    { name: 'Maria L.', xp: [1, 2, 2, 4, 4, 2, 3], color: '#8E97FD' },
                    { name: 'João P.', xp: [1, 3, 2, 1, 3, 3, 2], color: '#FFC97E' },
                ]}
            />

            <View>
                <Text style={styles.secondaryTitle}>Pontuação</Text>

                <RankingParticipantCard
                    name="Natali S."
                    completedTasks={20}
                    rank={1}
                    backgroundColor="#598E9C"
                    isCurrentUser={true}
                />

                <RankingParticipantCard
                    name="Maria L."
                    completedTasks={18}
                    rank={2}
                    backgroundColor="#8E97FD"
                />

                <RankingParticipantCard
                    name="João P."
                    completedTasks={15}
                    rank={3}
                    backgroundColor="#FFC97E"
                />
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
});