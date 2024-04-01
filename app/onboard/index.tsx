import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceholderImage from '~/components/onboard/placeholder';
import TabIndicator from '~/components/tab-indicator';

import BaseScreen from '~/components/ui/base-screen';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function OnboardScreen() {
  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <PlaceholderImage />
        <TabIndicator activeTab={0} totalTabs={3} />

        <Text className="font-incon_semibold text-4xl text-center mt-12">Welcome to Blubber!</Text>
        <Text className="font-incon text-xl text-center">
          Where we track your weight with wit! Get ready for a unique experience that combines
          effective weight tracking with a sprinkle of humor.
        </Text>

        <View className="flex-1 justify-end">
          <Link asChild href="/onboard/style">
            <AnimatedTouchableOpacity
              entering={FadeIn.delay(500)}
              className="self-center bg-black rounded-xl w-full"
            >
              <Text className="text-white font-incon_semibold text-center text-2xl py-4">
                Get Started
              </Text>
            </AnimatedTouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
