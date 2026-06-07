import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

const VIDEOS = [
  { id: '1', title: 'Vamos escutar uma música?', reward: 'RECOMPENSA: GRK 13/13' },
  { id: '2', title: 'Que susto ou quase isso!', reward: 'RECOMPENSA: GRK 24/86' },
  { id: '3', title: 'Video especial', reward: 'RECOMPENSA: GRK 20/10' },
  { id: '4', title: 'Morrendo de rir', reward: 'RECOMPENSA: GRK 34/69' },
  { id: '5', title: 'Ovnn...', reward: 'RECOMPENSA: GRK 12/7' },
  { id: '6', title: 'Só no Brasil', reward: 'RECOMPENSA: GRK 23/57' },
  { id: '7', title: 'Mais um dia em MG', reward: 'RECOMPENSA: GRK 38/27' },
];

type HistoryType = 'recompensa' | 'atividade' | 'conquista' | 'streak';

interface HistoryItem {
  id: string;
  type: HistoryType;
  title: string;
  description: string;
  time: string;
}

const HISTORICO: HistoryItem[] = [
  {
    id: '1',
    type: 'recompensa',
    title: 'Recompensa desbloqueada!',
    description: 'Você desbloqueou o vídeo "País Tropical"',
    time: 'Hoje, 09:14',
  },
  {
    id: '2',
    type: 'streak',
    title: '7 dias seguidos! 🔥',
    description: 'Você manteve sua sequência por uma semana',
    time: 'Hoje, 08:00',
  },
  {
    id: '3',
    type: 'atividade',
    title: 'Atividade concluída',
    description: 'Meditação matinal — 10 min',
    time: 'Ontem, 07:45',
  },
  {
    id: '4',
    type: 'conquista',
    title: 'Conquista: Iniciante',
    description: 'Completou 5 atividades pela primeira vez',
    time: 'Ontem, 07:45',
  },
  {
    id: '5',
    type: 'atividade',
    title: 'Atividade concluída',
    description: 'Respiração guiada — 5 min',
    time: '05/06, 21:30',
  },
  {
    id: '6',
    type: 'recompensa',
    title: 'Recompensa desbloqueada!',
    description: 'Você desbloqueou o vídeo "Só no Brasil"',
    time: '04/06, 18:00',
  },
  {
    id: '7',
    type: 'conquista',
    title: 'Conquista: Consistente',
    description: 'Completou atividades por 3 dias seguidos',
    time: '03/06, 20:10',
  },
  {
    id: '8',
    type: 'streak',
    title: '3 dias seguidos! 🔥',
    description: 'Continue assim, você está indo bem!',
    time: '03/06, 20:10',
  },
];

const HISTORY_CONFIG: Record<HistoryType, { icon: string; bg: string }> = {
  recompensa: { icon: 'gift',         bg: colors.primary },
  atividade:  { icon: 'checkmark',    bg: '#4CAF50' },
  conquista:  { icon: 'trophy',       bg: colors.yellow },
  streak:     { icon: 'flame',        bg: '#FF6B6B' },
};

export default function Recompensas() {
  const [activeTab, setActiveTab] = useState<'video' | 'noticias'>('video');
  const router = useRouter();
  const items = activeTab === 'video' ? VIDEOS : [];

  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleItemPress = (index: number) => {
    if (index === 0) {
      router.push('/player');
    } else {
      showToast();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.label}>recompensa</Text>
        <Text style={styles.title}>A hora chegou...</Text>
        <Text style={styles.subtitle}>Retire e acrescente suas recompensas</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'video' && styles.tabActive]}
          onPress={() => setActiveTab('video')}
        >
          <Text style={[styles.tabText, activeTab === 'video' && styles.tabTextActive]}>
            VÍDEO
          </Text>
          {activeTab === 'video' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'noticias' && styles.tabActive]}
          onPress={() => setActiveTab('noticias')}
        >
          <Text style={[styles.tabText, activeTab === 'noticias' && styles.tabTextActive]}>
            NOTÍCIAS
          </Text>
          {activeTab === 'noticias' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {activeTab === 'video' ? (
          items.map((item, index) => {
            const locked = index !== 0;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.listItem, locked && styles.listItemLocked]}
                onPress={() => handleItemPress(index)}
                activeOpacity={0.7}
              >
                <View style={[styles.playButton, !locked && styles.playButtonActive]}>
                  <Ionicons
                    name={locked ? 'lock-closed' : 'play'}
                    size={14}
                    color={locked ? colors.gray : colors.white}
                  />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemTitle, locked && styles.itemTitleLocked]}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemReward}>{item.reward}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            <Text style={styles.historyLabel}>Atividade recente</Text>
            {HISTORICO.map((item) => {
              const config = HISTORY_CONFIG[item.type];
              return (
                <View key={item.id} style={styles.historyItem}>
                  <View style={[styles.historyIcon, { backgroundColor: config.bg }]}>
                    <Ionicons name={config.icon as any} size={16} color={colors.white} />
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <Text style={styles.historyDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.historyTime}>{item.time}</Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>

      {/* Toast */}
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Ionicons name="lock-closed" size={14} color={colors.white} style={{ marginRight: 8 }} />
        <Text style={styles.toastText}>Conclua mais atividades para desbloquear</Text>
      </Animated.View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  label: {
    fontSize: 11,
    color: colors.textLight,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  tab: {
    marginRight: 28,
    paddingBottom: 10,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
    letterSpacing: 0.8,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemLocked: {
    opacity: 0.5,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  playButtonActive: {
    backgroundColor: colors.primary,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 3,
  },
  itemTitleLocked: {
    color: colors.textLight,
  },
  itemReward: {
    fontSize: 11,
    color: colors.textLight,
    letterSpacing: 0.3,
  },
  historyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  historyDescription: {
    fontSize: 12,
    color: colors.textLight,
  },
  historyTime: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'right',
  },
  toast: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },

});