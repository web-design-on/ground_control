import { Image, StyleSheet, Text, View } from 'react-native';

export interface RankingParticipantCardProps {
    name: string;
    completedTasks: number;
    rank: number;
    backgroundColor: string;
    isCurrentUser?: boolean;
}

export default function RankingParticipantCard({
    name,
    completedTasks,
    rank,
    backgroundColor,
    isCurrentUser,
}: RankingParticipantCardProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={[styles.cardImageContainer, { backgroundColor: backgroundColor }]}>
                <Image source={require('../assets/icons/ranking/robot.png')} style={styles.cardImage} />
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.rankingText}>{rank}º lugar</Text>
                <View style={styles.cardInfoRow}>
                    <Text style={styles.participantName}>{isCurrentUser ? "Você" : name}</Text>
                    <Text style={styles.completedTasks}>{completedTasks} tarefas completas</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 8,
    },
    cardImageContainer: {
        padding: 16,
        borderRadius: 26,
        marginTop: 8,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        width: 24,
        height: 24,
    },
    cardInfo: {
        flex: 1,
        flexDirection: 'column'
    },
    cardInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    rankingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3F414E',
    },
    participantName: {
        fontSize: 14,
        color: '#A0A3B1',
    },
    completedTasks: {
        fontSize: 14,
        color: '#A0A3B1',
    },
});