import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link, useNavigation } from 'expo-router';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

export default function WeightHistoryList() {
  const entries = useWeightHistory((store) => store.entries);
  const navigation = useNavigation();

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="w-full flex-row justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" color="#a3a3a3" size={20} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="filter" color="#a3a3a3" size={17} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={entries.sort((a, b) => b.date - a.date)}
          style={{ marginTop: 24 }}
          ItemSeparatorComponent={() => <View className="w-full h-1" />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Text className="font-incon_semibold text-neutral-500 text-xl">
                    {dayjs(item.date).fromNow()}
                  </Text>
                </View>
                <WeightText weight={item.weight} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </BaseScreen>
  );
}
