import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_TIME = 300; // 5 minutos

export default function MeditacaoScreen() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress = (TOTAL_TIME - secondsLeft) / TOTAL_TIME;

  const finished = secondsLeft === 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="close"
          size={30}
          color={colors.textDark}
        />
      </TouchableOpacity>

      {!finished ? (
        <>
          <Text style={styles.title}>
            Acalme sua mente
          </Text>

          <Text style={styles.subtitle}>
            MEDITAÇÃO DIÁRIA
          </Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timer}>
              {formatTime(secondsLeft)}
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={34}
              color={colors.white}
            />
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Feche os olhos e concentre-se apenas na respiração.
          </Text>
        </>
      ) : (
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedTitle}>
            Parabéns!
          </Text>

          <Text style={styles.finishedText}>
            Você concluiu sua meditação diária.
          </Text>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.finishButtonText}>
              VOLTAR PARA HOME
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: colors.textDark,
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    color: colors.textLight,
    letterSpacing: 2,
    fontSize: 12,
  },

  timerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  timer: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.textDark,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#E4E7F5',
    borderRadius: 99,
    overflow: 'hidden',
    marginTop: 40,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },

  playButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  helperText: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 40,
    fontSize: 16,
    lineHeight: 24,
  },

  finishedContainer: {
    alignItems: 'center',
  },

  finishedTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textDark,
  },

  finishedText: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 18,
  },

  finishButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 16,
    marginTop: 32,
  },

  finishButtonText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 1,
  },
});