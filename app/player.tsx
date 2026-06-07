import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const TOTAL_DURATION = 2700; // 45:00
const INITIAL_POSITION = 90; // 1:30

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Player() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [liked, setLiked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setPosition((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      {/* Top Actions */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? '#e74c3c' : colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <View style={styles.artContainer}>
        <View style={styles.artWrapper}>
          <View style={styles.artPlaceholder}>
            <View style={styles.artInner}>
              <Text style={styles.artEmoji}>🌴</Text>
            </View>
            <View style={styles.artBadge}>
              <Text style={styles.artBadgeText}>PAÍS{'\n'}TROPICAL</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Song Info */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>País Tropical</Text>
        <Text style={styles.songArtist}>Jorge Ben Jor</Text>
        <Text style={styles.songDescription}>
          Use a música para relaxar e{'\n'}curtir você merece esse tempo{'\n'}para você
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setPosition(Math.max(0, position - 15))}
          style={styles.controlBtn}
        >
          <Ionicons name="play-back" size={28} color={colors.white} />
          <Text style={styles.controlLabel}>15</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playPauseBtn}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color={colors.navy} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPosition(Math.min(TOTAL_DURATION, position + 15))}
          style={styles.controlBtn}
        >
          <Ionicons name="play-forward" size={28} color={colors.white} />
          <Text style={styles.controlLabel}>15</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={TOTAL_DURATION}
          value={position}
          onValueChange={setPosition}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="rgba(255,255,255,0.25)"
          thumbTintColor={colors.primary}
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(TOTAL_DURATION)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
  },
  artWrapper: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  artPlaceholder: {
    flex: 1,
    backgroundColor: '#2d5a1b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  artInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a7a22',
  },
  artEmoji: {
    fontSize: 64,
  },
  artBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  artBadgeText: {
    color: colors.yellow,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  songTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 16,
  },
  songDescription: {
    fontSize: 13,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 24,
  },
  controlBtn: {
    alignItems: 'center',
  },
  controlLabel: {
    color: colors.gray,
    fontSize: 10,
    marginTop: 2,
  },
  playPauseBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  progressContainer: {
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  timeText: {
    color: colors.gray,
    fontSize: 12,
  },
});