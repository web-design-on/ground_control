import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ headerShown: false }}
      initialRouteName="onboarding"
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="player" />
      <Stack.Screen name="atividades" />
      <Stack.Screen name="meditacao" />
    </Stack>
  );
}