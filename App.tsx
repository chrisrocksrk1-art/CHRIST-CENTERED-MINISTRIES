import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

// Daily Devotion Screen
import DailyDevotionScreen from './src/screens/DailyDevotionScreen';
// Sermons
import SermonsScreen from './src/screens/SermonsScreen';
import SermonDetailScreen from './src/screens/SermonDetailScreen';
// Prayer Request
import PrayerRequestScreen from './src/screens/PrayerRequestScreen';
// Contact Us
import ContactUsScreen from './src/screens/ContactUsScreen';
// Donate
import DonateScreen from './src/screens/DonateScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#C41E3A',
  secondary: '#1a1a2e',
  accent: '#FFD700',
  background: '#f5f5f5',
  white: '#ffffff',
  text: '#333333',
  lightText: '#666666',
};

function SermonsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SermonsList"
        component={SermonsScreen}
        options={{ title: 'Sermons' }}
      />
      <Stack.Screen
        name="SermonDetail"
        component={SermonDetailScreen}
        options={{ title: 'Sermon Details' }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightText,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'DailyDevotion') iconName = 'book';
          else if (route.name === 'Sermons') iconName = 'microphone';
          else if (route.name === 'PrayerRequest') iconName = 'hands';
          else if (route.name === 'Contact') iconName = 'call';
          else if (route.name === 'Donate') iconName = 'heart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DailyDevotion"
        component={DailyDevotionScreen}
        options={{ title: 'Daily' }}
      />
      <Tab.Screen
        name="Sermons"
        component={SermonsStack}
        options={{ title: 'Sermons' }}
      />
      <Tab.Screen
        name="PrayerRequest"
        component={PrayerRequestScreen}
        options={{ title: 'Prayer' }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactUsScreen}
        options={{ title: 'Contact' }}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{ title: 'Donate' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export { COLORS };
