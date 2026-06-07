import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export interface HealthStatsCardsProps {
    score?: number;
    scoreMax?: number;
    sentiment?: string;
    moodBars?: number[];
    trackedDays?: number;
    totalDays?: number;
}

const CARD_RADIUS = 20;
const PURPLE = '#8E97FD';
const ORANGE = '#FFC97E';
const DARK_BLUE = '#03174C';
const TEAL = '#598E9C';
const WHITE = '#FFFFFF';
const DARK = '#3F414E';
const WHITE_MUTED = 'rgba(255,255,255,0.3)';
const WHITE_ACTIVE = 'rgba(255,255,255,0.9)';

interface ScoreRingProps {
    size: number;
    score: number;
    max: number;
}

function ScoreRing({ size, score, max }: ScoreRingProps) {
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 10;
    const strokeWidth = 11;
    const pct = Math.min(score / max, 1);
    const sweep = pct * 360;

    const trackPath = Skia.Path.Make();
    trackPath.addCircle(cx, cy, radius);

    const arcPath = Skia.Path.Make();
    arcPath.addArc({ x: cx - radius, y: cy - radius, width: radius * 2, height: radius * 2 }, -90, sweep);

    const trackPaint = Skia.Paint();
    trackPaint.setColor(Skia.Color(DARK));
    trackPaint.setStyle(1);
    trackPaint.setStrokeWidth(strokeWidth);
    trackPaint.setAntiAlias(true);

    const arcPaint = Skia.Paint();
    arcPaint.setColor(Skia.Color(WHITE));
    arcPaint.setStyle(1);
    arcPaint.setStrokeWidth(strokeWidth);
    arcPaint.setStrokeCap(1);
    arcPaint.setAntiAlias(true);

    return (
        <Canvas style={{ width: size, height: size }}>
            <Path path={trackPath} paint={trackPaint} />
            <Path path={arcPath} paint={arcPaint} />
        </Canvas>
    );
}

interface MoodBarsProps {
    bars: number[];
    height: number;
}

function MoodBars({ bars, height }: MoodBarsProps) {
    const max = Math.max(...bars, 1);
    return (
        <View style={[moodStyles.container, { height }]}>
            {bars.map((val, i) => (
                <View
                    key={i}
                    style={[
                        moodStyles.bar,
                        { height: `${Math.round((val / max) * 100)}%` },
                    ]}
                />
            ))}
        </View>
    );
}

const moodStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        flex: 1,
    },
    bar: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 3,
    },
});

interface TrackerGridProps {
    completed: number;
    total: number;
    dotsToShow?: number;
}

function TrackerGrid({ completed, dotsToShow = 25 }: TrackerGridProps) {
    const activeDots = Math.min(completed, dotsToShow);
    return (
        <View style={trackerStyles.grid}>
            {Array.from({ length: dotsToShow }).map((_, i) => (
                <View
                    key={i}
                    style={[trackerStyles.dot, i < activeDots && trackerStyles.dotActive]}
                />
            ))}
        </View>
    );
}

const trackerStyles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        flex: 1,
        alignContent: 'flex-start',
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 4,
        backgroundColor: WHITE_MUTED,
    },
    dotActive: {
        backgroundColor: WHITE_ACTIVE,
    },
});

const DEFAULT_BARS = [2, 4, 6, 9, 7, 5, 8, 6];

export default function HealthStatsCards({
    score = 80,
    scoreMax = 100,
    sentiment = 'Triste',
    moodBars = DEFAULT_BARS,
    trackedDays = 5,
    totalDays = 31,
}: HealthStatsCardsProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={[styles.card, { backgroundColor: PURPLE }]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>♡</Text>
                    <Text style={styles.cardLabel}>Seu Score</Text>
                </View>
                <View style={styles.ringWrapper}>
                    <ScoreRing size={130} score={score} max={scoreMax} />
                    <View style={styles.ringOverlay}>
                        <Text style={styles.scoreNumber}>{score}</Text>
                        <Text style={styles.scoreSubLabel}>Desafios Concluídos</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: ORANGE }]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>☹</Text>
                    <Text style={styles.cardLabel}>Sentimento</Text>
                </View>
                <Text style={styles.bigValue}>{sentiment}</Text>
                <MoodBars bars={moodBars} height={70} />
            </View>

            <View style={[styles.card, { backgroundColor: TEAL }]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>＋</Text>
                    <Text style={styles.cardLabel}>Track Mensal</Text>
                </View>
                <Text style={styles.bigValue}>{trackedDays}/{totalDays}</Text>
                <TrackerGrid completed={trackedDays} total={totalDays} />
            </View>

            <View style={[styles.card, { backgroundColor: DARK_BLUE }]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>☾</Text>
                    <Text style={styles.cardLabel}>Sono</Text>
                </View>
                <View style={styles.sleepInfoWrapper}>
                    <View>
                        <Text style={styles.sleepHoursSubtitle}>Média de</Text>
                        <Text style={styles.sleepHours}>7h 38min</Text>
                        <Text style={styles.sleepHoursSubtitle}>por noite</Text>
                    </View>
                </View>
                <View style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>GERENCIAR</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    card: {
        width: 140,
        borderRadius: CARD_RADIUS,
        padding: 14,
        height: 180,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 6,
    },
    cardIcon: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.9)',
    },
    ringWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    ringOverlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: WHITE,
        lineHeight: 20,
    },
    scoreSubLabel: {
        fontSize: 9,
        marginTop: 2,
        color: WHITE,
    },
    bigValue: {
        fontSize: 22,
        fontWeight: '700',
        color: WHITE,
        marginBottom: 6,
    },
    sleepInfoWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    sleepHours: {
        fontSize: 22,
        fontWeight: '700',
        color: WHITE,
        lineHeight: 26,
    },
    sleepHoursSubtitle: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.85)',
    },
    cardButton: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 4,
        width: '100%',
        alignItems: 'center'
    },
    cardButtonText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#333242',
        letterSpacing: 0.5,
    },
});