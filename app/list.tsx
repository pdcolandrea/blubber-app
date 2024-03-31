import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link, useNavigation } from 'expo-router';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

export default function WeightHistoryList() {
  const addFakeEntries = useWeightHistory((store) => store.debugAdd);
  const entries = useWeightHistory((store) => store.entries);

  return (
    <BaseScreen>
      <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
        <NavHeader
          showBack
          right={
            <TouchableOpacity onPress={addFakeEntries}>
              <Feather name="filter" color="#a3a3a3" size={17} />
            </TouchableOpacity>
          }
        />

        <FlatList
          data={entries.sort((a, b) => +new Date(b.date) - +new Date(a.date))}
          scrollEnabled={entries.length > 0}
          style={{ marginTop: 24 }}
          ItemSeparatorComponent={() => <View className="w-full h-1" />}
          ListEmptyComponent={() => (
            <Link asChild replace href="/add">
              <TouchableOpacity className="mt-60">
                <Text className="text-center text-neutral-500 text-2xl">No entries yet</Text>
                <Text className="text-center text-neutral-500 text-xl">
                  Swipe up on main screen or touch here to get started.
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          renderItem={({ item, index }) => {
            return (
              <Link asChild href={`/entry/${item.id}`}>
                <TouchableOpacity className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Text className="font-incon_semibold text-neutral-500 text-xl">
                      {dayjs(item.date).fromNow()}
                    </Text>
                  </View>
                  <WeightText weight={item.weight} />
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      </SafeAreaView>
    </BaseScreen>
  );
}
