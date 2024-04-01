import { Link, useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceholderImage from '~/components/onboard/placeholder';
import TabIndicator from '~/components/tab-indicator';
import BaseScreen from '~/components/ui/base-screen';

import { useUserSettings } from '~/lib/user-store';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useWeightHistory } from '~/lib/weight-store';

export default function InitialInputScreen() {
  const [weight, setWeight] = useState(100);
  const setHasOnboarded = useUserSettings((store) => store.setOnboarded);
  const addUserEntry = useWeightHistory((store) => store.addEntry);
  const router = useRouter();

  const onStartPressed = () => {
    if (!weight || weight <= 50) {
      return Alert.alert('Invalid weight', 'Please enter a valid weight');
    }

    addUserEntry({ weight, date: new Date().toISOString() });

    setHasOnboarded(true);
    router.replace('/(tabs)/');
  };

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <PlaceholderImage />
        <TabIndicator activeTab={2} totalTabs={3} />

        <Text className="font-incon_semibold text-4xl text-center mt-12">About You</Text>
        <Text className="font-incon text-xl text-center mb-8">
          Input your current weight. Start your journey with fun and focus!
        </Text>

        <View className="flex-1 justify-center">
          <Animated.View entering={FadeIn} className="flex-row items-center justify-between">
            <Picker
              style={{ width: '45%', height: 215 }}
              selectedValue={weight}
              onValueChange={(item, index) => setWeight(item)}
              itemStyle={{ fontFamily: 'Inconsolata_600SemiBold' }}
            >
              {Array.from({ length: 500 }, (_, i) => {
                return <Picker.Item key={i} label={`${i + 1} lb`} value={i + 1} />;
              })}
              {/* <Picker.Item label="0 lb" value={0} /> */}
              {/* <Picker.Item label="1 lb" value={1} /> */}
            </Picker>

            <TouchableOpacity
              onPress={onStartPressed}
              className="w-1/2 bg-black rounded-2xl justify-center items-center"
            >
              <Text className="text-white font-incon_semibold py-4 text-2xl">Start Journey</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
