import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link, router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LineGraph } from 'react-native-graph';
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-wagmi-charts';

import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const screenWidth = Dimensions.get('window').width;

export default function TabOneScreen() {
  const userHistory = useWeightHistory((store) => store.entries);
  const refetchEntry = useWeightHistory((store) => store.lastEntry);
  const lastEntry = useWeightHistory((store) => store.lastEntry());
  const generateFakeData = useWeightHistory((store) => store.debugAdd);
  const userUnit = useWeightHistory((store) => store.unit);
  const openedModal = useRef(false);

  const [dateFilter, setDateFilter] = useState(7);

  useEffect(() => {
    // every 1min, refetch lastEntry

    const timer = setInterval(() => {
      console.log('fetching last entry');
      refetchEntry();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            const { velocityY } = nativeEvent;
            if (velocityY < 0 && !openedModal.current) {
              openedModal.current = true;
              router.push('/add');

              // do not allowe multiple modals to open
              const timer = setTimeout(() => {
                openedModal.current = false;
              }, 1000);

              return () => clearTimeout(timer);
            }
          }}>
          <View style={{ flex: 1 }}>
            <View className="w-full flex-row justify-between">
              <Link asChild href="/add">
                <TouchableOpacity
                  onPress={() => {
                    generateFakeData();
                  }}>
                  <Feather name="settings" color="#a3a3a3" size={17} />
                </TouchableOpacity>
              </Link>
              <Link asChild href="/list">
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="list" color="#a3a3a3" size={17} />
                </TouchableOpacity>
              </Link>
            </View>

            <View className="flex-row items-center justify-center mt-10 ">
              <WeightText weight={lastEntry?.weight ?? 0} size="lg" />
            </View>
            <Text className="font-incon text-center text-neutral-500 my-4">
              {dayjs(lastEntry?.date ?? new Date()).fromNow()}
            </Text>

            <View className="mt-6">
              <Animated.View entering={SlideInLeft} className="mb-5">
                <WeightText weight={195.32} />
                <Text className="font-incon text-xl text-neutral-500">Weekly Goal</Text>
              </Animated.View>
              <Animated.View entering={SlideInLeft.delay(300)}>
                <Text className="text-2xl font-incon_semibold">2 days</Text>
                <Text className="font-incon text-xl text-neutral-500">Streak</Text>
              </Animated.View>

              <Animated.View entering={SlideInLeft.delay(600)} className="mt-5">
                <Text className="text-2xl font-incon_semibold">21.4</Text>
                <Text className="font-incon text-xl text-neutral-500">BMI</Text>
              </Animated.View>
            </View>

            <View className="flex-1" />
          </View>
        </PanGestureHandler>

        <View style={{ marginHorizontal: -32 }}>
          <LineChart.Provider
            data={userHistory
              .filter((entry) => dayjs().diff(dayjs(entry.date), 'day') <= dateFilter)
              .map((entry) => {
                return {
                  value: entry.weight,
                  date: parseFloat(
                    new Date(entry.date).toISOString().replace('T', ' ').substring(0, 19)
                  ),
                };
              })}>
            <LineChart height={250}>
              <LineChart.Path>
                {/* <LineChart.Tooltip at={2} />

                <LineChart.Tooltip at={2} /> */}
              </LineChart.Path>
              <LineChart.CursorCrosshair>
                <LineChart.Tooltip>
                  <LineChart.PriceText
                    style={{
                      fontFamily: 'Inconsolata_600SemiBold',
                      backgroundColor: 'black',
                      borderRadius: 4,
                      color: 'white',
                      fontSize: 14,
                      padding: 4,
                    }}
                    format={({ value }) => {
                      'worklet';
                      return `${value} ${userUnit}`;
                    }}
                  />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
            </LineChart>
          </LineChart.Provider>
        </View>

        <FlatList
          data={[7, 14, 21]}
          horizontal
          // pagingEnabled
          onViewableItemsChanged={({ viewableItems, changed }) => {
            const [item] = viewableItems;
            const key = item.item as number;
            setDateFilter(key);
          }}
          bounces
          style={{ flexGrow: 0, marginBottom: 24 }}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={screenWidth} // Added for custom snapping
          decelerationRate="fast" // Optional, for smoother scrolling
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: screenWidth }}>
                <Animated.Text
                  style={{
                    fontFamily: 'Inconsolata_400Regular',
                    textAlign: 'center',
                    color: '#737373',
                    fontSize: 20,
                  }}>
                  Last {item} Days
                </Animated.Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </BaseScreen>
  );
}
