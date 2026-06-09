import { router } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PrimaryButton } from '@/components/Button';
import { colors } from '@/constants/theme';

export default function AtividadesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Olá Usuário, hoje
        </Text>

        <Text style={styles.title}>
          vamos meditar!
        </Text>

        <Text style={styles.description}>
          Feche os olhos por 5 minutos, acalme sua mente e concentre-se apenas na sua respiração.
        </Text>

        <Image
          source={require('../assets/images/astronautameditacao.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="COMECE"
          onPress={() => router.push('/meditacao')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingBottom: 32,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginTop: 6,
  },

  description: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 320,
  },

  image: {
    width: 320,
    height: 320,
    marginTop: 30,
  },

  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});