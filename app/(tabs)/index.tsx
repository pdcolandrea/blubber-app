import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function TabOneScreen() {
  const userHistory = useWeightHistory((store) => store.entries);

  const lastWeight = useMemo(() => {
    if (userHistory.length === 0) return 0;
    return userHistory[userHistory.length - 1].weight;
  }, [userHistory]);

  const lastDate = useMemo(() => {
    if (userHistory.length === 0) return 0;
    return userHistory[userHistory.length - 1].date;
  }, [userHistory]);

  return (
    <BaseScreen>
      <SafeAreaView>
        <View className="w-full flex-row justify-between">
          <Link asChild href="/add">
            <TouchableOpacity onPress={() => {}}>
              <Feather name="settings" color="#a3a3a3" size={17} />
            </TouchableOpacity>
          </Link>
          <Link asChild href="/list">
            <TouchableOpacity>
              <Feather name="list" color="#a3a3a3" size={17} />
            </TouchableOpacity>
          </Link>
        </View>

        <View className="flex-row items-center justify-center mt-10 ">
          <WeightText weight={lastWeight} size="lg" />
        </View>
        <Text className="font-incon text-center text-neutral-500 my-4">
          {dayjs(lastDate).fromNow()}
        </Text>

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
