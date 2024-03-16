import '../global.css';

import {
  useFonts,
  Inconsolata_200ExtraLight,
  Inconsolata_300Light,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_600SemiBold,
  Inconsolata_700Bold,
  Inconsolata_800ExtraBold,
  Inconsolata_900Black,
} from '@expo-google-fonts/inconsolata';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';

import { KeyboardProvider } from 'react-native-keyboard-controller';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Inconsolata_200ExtraLight,
    Inconsolata_300Light,
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_600SemiBold,
    Inconsolata_700Bold,
    Inconsolata_800ExtraBold,
    Inconsolata_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  console.warn({ scheme });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <ThemeProvider value={scheme === 'light' ? DefaultTheme : DarkTheme}>
          {/* <NavigationContainer> */}
          <Stack>
            {/* stacks */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="list" options={{ headerShown: false }} />
            <Stack.Screen name="settings/index" options={{ headerShown: false }} />
            <Stack.Screen name="settings/goal" />
            <Stack.Screen name="settings/motivation" />
            <Stack.Screen name="settings/reminders" />
            <Stack.Screen name="settings/units" />

            {/* modals */}
            <Stack.Screen
              name="add"
              options={{ presentation: 'modal', headerTitle: 'Add Weight Entry' }}
            />
          </Stack>
        </ThemeProvider>
        {/* </NavigationContainer> */}
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
