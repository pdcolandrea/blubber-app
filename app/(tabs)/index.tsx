import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';

export default function TabOneScreen() {
  return (
    <BaseScreen>
      <SafeAreaView>
        <View className="w-full flex-row justify-between">
          <Link asChild href="/add">
            <TouchableOpacity onPress={() => {}}>
              <Feather name="settings" color="#a3a3a3" size={17} />
            </TouchableOpacity>
          </Link>
          <Feather name="list" color="#a3a3a3" size={17} />
        </View>

        <View className="flex-row items-center justify-center mt-10 ">
          <WeightText weight={190.29} size="lg" />
        </View>
        <Text className="font-incon text-center text-neutral-500 my-4">3 pounds lost so far</Text>

        <View className="mt-6">
          <View>
            <WeightText weight={195.32} />
            <Text className="font-incon text-xl text-neutral-500">Last Entry</Text>
          </View>

          <View className="mt-5">
            <Text className="text-2xl font-incon_semibold">21.4</Text>
            <Text className="font-incon text-xl text-neutral-500">BMI</Text>
          </View>

          <View className="mt-5">
            <WeightText weight={195.32} />
            <Text className="font-incon text-xl text-neutral-500">Weekly Goal</Text>
          </View>
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
