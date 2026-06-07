import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 8,
          paddingTop: 8,
          height: 104,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#8E97FD',
        tabBarInactiveTintColor: '#A0A3B1',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => ( <Image source={require('../../assets/icons/navigation/home.png')} style={{ width: 24, height: 24, tintColor: color }} /> ),
        }}
      />

      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => ( <Image source={require('../../assets/icons/navigation/ranking.png')} style={{ width: 24, height: 24, tintColor: color }} /> ),
        }}
      />

<Tabs.Screen
  name="recompensas"
  options={{
    title: 'Recompensas',
    tabBarIcon: ({ color }) => <Ionicons name="gift-outline" size={24} color={color} />,
  }}
/>
    </Tabs>
  );
}