import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const DAYS = ['S', 'D', 'S', 'T', 'Q', 'Q', 'S'];
const SCREEN_WIDTH = Dimensions.get('window').width;

export interface Participant {
    name: string;
    xp: number[];
    color: string;
    isCurrentUser?: boolean;
}

interface WeeklyRankingProps {
    participants: Participant[];
    title?: string;
}

export default function WeeklyRanking({
    participants
}: WeeklyRankingProps) {
    const totals = participants.map(p => p.xp.reduce((a, b) => a + b, 0));
    const chartWidth = SCREEN_WIDTH - 80;

    const datasets = participants.map((p, pIdx) =>
        p.xp.map((value, dayIdx) => ({
            value,
            ...(pIdx === 0 ? { label: DAYS[dayIdx] } : {}),
        }))
    );

    return (
        <View style={styles.card}>
            <View style={styles.rankingInfoContainer}>
                <Text style={styles.title}>Tarefas da semana</Text>

                <View style={styles.legendContainer}>
                    {participants.map((p, i) => (
                        <View key={p.name} style={styles.legendRow}>
                            <View style={styles.legendLeft}>
                                <View style={[styles.legendDot, { backgroundColor: p.color }]} />
                                <Text style={styles.legendName}>
                                    {p.isCurrentUser ? "Você" : p.name}
                                </Text>
                            </View>
                            <Text style={[styles.legendXP, { color: p.color }]}>
                                {totals[i]}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>


            <LineChart
                data={datasets[0]}
                data2={datasets[1]}
                data3={datasets[2]}
                width={chartWidth}
                height={200}
                maxValue={10}
                noOfSections={5}
                color1={participants[0]?.color}
                color2={participants[1]?.color}
                color3={participants[2]?.color}
                dataPointsColor1={participants[0]?.color}
                dataPointsColor2={participants[1]?.color}
                dataPointsColor3={participants[2]?.color}
                dataPointsRadius={4}
                xAxisLabelTextStyle={styles.axisLabel}
                yAxisTextStyle={styles.axisLabel}
                yAxisColor="transparent"
                xAxisColor="#E6E1F2"
                rulesColor="#E6E1F2"
                rulesType="solid"
                spacing={Math.floor(chartWidth / (DAYS.length))}
                hideOrigin
                thickness={2}
                hideDataPoints={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 16,
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3F414E',
        marginBottom: 12,
    },
    legendContainer: {
        marginBottom: 16,
        gap: 6,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    legendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3F414E',
    },
    legendNameMuted: {
        fontWeight: '400',
        color: '#A1A4B2',
    },
    legendXP: {
        fontSize: 13,
        fontWeight: '600',
    },
    axisLabel: {
        fontSize: 11,
        color: '#A1A4B2',
    },
    rankingInfoContainer: {
        paddingHorizontal: 16,
    }
});
