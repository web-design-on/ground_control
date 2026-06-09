import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/theme';

const VIDEOS = [
  { id: '1', title: 'Vamos escutar uma música?', reward: 'RECOMPENSA DIA 12/06' },
  { id: '2', title: 'Que susto ou quase isso!', reward: 'RECOMPENSA DIA 13/06' },
  { id: '3', title: 'Video especial', reward: 'RECOMPENSA DIA 14/06' },
  { id: '4', title: 'Morrendo de rir', reward: 'RECOMPENSA DIA 15/06' },
  { id: '5', title: 'Ovnn...', reward: 'RECOMPENSA DIA 16/06' },
  { id: '6', title: 'Só no Brasil', reward: 'RECOMPENSA DIA 17/06' },
  { id: '7', title: 'Mais um dia em MG', reward: 'RECOMPENSA DIA 18/06' },
];

const NOTICIAS = [
  { id: '1', title: 'Brasil registra queda na inflação', reward: 'RECOMPENSA DIA 12/06' },
  { id: '2', title: 'Trend do momento: Aprendendo o passinho do Six Seven', reward: 'RECOMPENSA DIA 13/06' },
  { id: '3', title: 'Copa 2026: Os melhores memes do uniforme "pijama" da seleção', reward: 'RECOMPENSA DIA 14/06' },
  { id: '4', title: 'Cultura e Raízes: Festival celebra a riqueza da agricultura familiar pelo país', reward: 'RECOMPENSA DIA 15/06' },
  { id: '5', title: 'Biodiversidade: Novas áreas de proteção ambiental são criadas no Brasil', reward: 'RECOMPENSA DIA 16/06' },
  { id: '6', title: 'Tech brasileira em expansão', reward: 'RECOMPENSA DIA 17/06' },
  { id: '7', title: 'Copa: seleção em preparação', reward: 'RECOMPENSA DIA 18/06' },
];

export default function Recompensas() {
  const [activeTab, setActiveTab] = useState<'video' | 'noticias'>('video');
  const router = useRouter();

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

  const handleVideoPress = (index: number) => {
    if (index === 0) {
      router.push('/player');
    } else {
      showToast();
    }
  };

  const handleNoticiaPress = (index: number) => {
    if (index !== 0) {
      showToast();
    }
  };

  const items = activeTab === 'video' ? VIDEOS : NOTICIAS;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>A hora chegou...</Text>
        <Text style={styles.subtitle}>Retire e aproveite suas recompensas</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('video')}
        >
          <Text style={[styles.tabText, activeTab === 'video' && styles.tabTextActive]}>
            VÍDEO
          </Text>
          {activeTab === 'video' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
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
        {items.map((item, index) => {
          const locked = index !== 0;
          const isVideo = activeTab === 'video';
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.listItem, locked && styles.listItemLocked]}
              onPress={() => isVideo ? handleVideoPress(index) : handleNoticiaPress(index)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconButton, !locked && styles.iconButtonActive]}>
                <Ionicons
                  name={locked ? 'lock-closed' : isVideo ? 'play' : 'newspaper-outline'}
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
        })}
      </ScrollView>

      {/* Toast */}
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Ionicons name="lock-closed" size={14} color={colors.white} style={{ marginRight: 8 }} />
        <Text style={styles.toastText}>Conclua mais atividades para desbloquear</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
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
    paddingHorizontal: 24,
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
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconButtonActive: {
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
