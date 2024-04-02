import { Link, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceholderImage from '~/components/onboard/placeholder';
import TabIndicator from '~/components/tab-indicator';
import BaseScreen from '~/components/ui/base-screen';
import { useUserSettings } from '~/lib/user-store';

export default function UserStyleScreen() {
  const toggleHardMode = useUserSettings((store) => store.toggleHardMode);
  const router = useRouter();

  const onSassyPressed = () => {
    // false is the default
    toggleHardMode();
    router.push('/onboard/input');
  };

  const onClassicPressed = () => {
    router.push('/onboard/input');
  };

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <PlaceholderImage />
        <TabIndicator activeTab={1} totalTabs={3} />

        <Text className="font-incon_semibold text-4xl text-center mt-12 dark:text-white">
          Choose Your Style
        </Text>
        <Text className="font-incon dark:text-white text-xl text-center">
          Straight talk or sassy humor? Customize your motivational style here.
        </Text>

        <View className="flex-1 justify-end">
          <Animated.View entering={FadeIn} className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={onSassyPressed}
              className="bg-black dark:bg-white w-[47%] rounded-xl"
            >
              <Text className="text-white dark:text-black font-incon_semibold text-center text-2xl py-4">
                Sassy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClassicPressed}
              className="bg-black dark:bg-white w-[47%] rounded-xl"
            >
              <Text className="text-white dark:text-black font-incon_semibold text-center text-2xl py-4">
                Classic
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
