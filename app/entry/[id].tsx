import clsx from 'clsx';
import dayjs from 'dayjs';

import { useLocalSearchParams } from 'expo-router';
import { Text, Image, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SatisfactionIcon from '~/components/icons/satisfaction';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import WeightText from '~/components/weight-text';
import { retreivePathsForEntries } from '~/lib/image-filesystem';
import { useWeightHistory } from '~/lib/weight-store';

export default function WeightEntryScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const entry = useWeightHistory((store) => store.getEntry(parseInt(params.id)));

  if (!entry) {
    return (
      <BaseScreen>
        <Text>Entry not found</Text>
      </BaseScreen>
    );
  }

  const monthDay = dayjs(entry.date).format('MMMM D');
  const year = dayjs(entry.date).format('YYYY');
  const time = dayjs(entry.date).format('h:mm');
  const amOrPm = dayjs(entry.date).format('A');

  const images = retreivePathsForEntries(entry.images);

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <NavHeader showBack />
        <View className="self-center mb-10 mt-6">
          <WeightText weight={entry.weight} size="lg" />
          {entry.satisfaction && (
            <View className="self-center my-2">
              <SatisfactionIcon satisfaction={entry.satisfaction} size={14} />
            </View>
          )}
        </View>

        <View className="flex-row items-center mb-4">
          <Text className={`dark:text-white text-center font-incon_semibold text-2xl`}>{time}</Text>
          <Text className={clsx('dark:text-white text-center font-incon text-2xl')}> {amOrPm}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className={`dark:text-white text-center font-incon_semibold text-2xl`}>
            {monthDay}
          </Text>
          <Text className={clsx('dark:text-white text-center font-incon text-2xl')}> {year}</Text>
        </View>

        <View className="mt-6 items-center">
          <FlatList
            data={images}
            horizontal
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled={images.length > 1}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    width: 300,
                    height: 400,
                    backgroundColor: '#e5e5e5',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text className="font-incon_semibold">No Images</Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ width: 300, height: 400 }}>
                  <Image
                    source={{
                      uri: item,
                    }}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              );
            }}
          />
        </View>

        {/* <Image source={{ uri: images[0] }} style={{ width: 200, height: 200 }} /> */}
        {/* <Text className="dark:text-white">{JSON.stringify(entry)}</Text> */}
      </SafeAreaView>
    </BaseScreen>
  );
}
