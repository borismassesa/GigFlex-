import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { Briefcase, Compass, Calendar, User, DollarSign } from 'lucide-react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3c9f50',
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.backgroundAlt,
          borderTopColor: colors.border,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />
        }}
      />
      
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />
        }}
      />
      
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
          href: "/earnings"
        }}
      />
      
      <Tabs.Screen
        name="shifts"
        options={{
          title: "Shifts",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />
        }}
      />
    </Tabs>
  );
}