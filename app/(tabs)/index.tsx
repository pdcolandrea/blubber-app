import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { FadeIn, SlideInLeft, runOnJS } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-wagmi-charts';

import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const screenWidth = Dimensions.get('window').width;

const NO_DATA_WEIGHT = [
  { value: 220, date: 1678838400 }, // Start: March 15, 2024
  { value: 219.8, date: 1678924800 }, // Small loss
  { value: 220.2, date: 1679011200 }, // Slight gain - normal fluctuation
  { value: 219.6, date: 1679097600 }, // Loss
  { value: 219.4, date: 1679184000 }, // Small loss
  { value: 219.5, date: 1679270400 }, // Slight gain - fluctuation
  { value: 219, date: 1679356800 }, // Loss
  { value: 218.7, date: 1679443200 }, // Small loss
  { value: 218.9, date: 1679529600 }, // Slight gain - fluctuation
  { value: 219.5, date: 1679616000 }, // Loss
];

export default function TabOneScreen() {
  const userHistory = useWeightHistory((store) => store.entries);
  const refetchEntry = useWeightHistory((store) => store.lastEntry);
  const weightGoal = useWeightHistory((store) => store.goal);
  const lastEntry = useWeightHistory((store) => store.lastEntry());
  const streak = useWeightHistory((store) => store.getStreak());
  const userUnit = useWeightHistory((store) => store.unit);

  const chartLow = useRef(0);
  const chartHigh = useRef(0);
  const openedModal = useRef(false);
  const ref = useRef<FlatList>(null);

  const height = 72;

  const [dateFilter, setDateFilter] = useState(7);
  const { dark } = useTheme();

  const userHasValidChart = userHistory.length >= 2;

  useEffect(() => {
    // every 1min, refetch lastEntry

    const timer = setInterval(() => {
      console.log('fetching last entry');
      refetchEntry();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const bmi = useMemo(() => {
    if (!lastEntry || !height) return null;

    if (userUnit === 'lb') {
      // calculate bmi in lb and inches
      return ((lastEntry.weight / (height * height)) * 703).toFixed(1);
    }

    // calculate bmi in kg and cm
    return (lastEntry.weight / ((height / 100) * (height / 100))).toFixed(1);
  }, [lastEntry, height]);

  const formatDate = (date: number) => {
    console.log({ date });
    return dayjs(date).format('MM/DD @ ha').toUpperCase();
  };

  const onLayout = () => {
    ref.current?.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    });
  };

  return (
    <BaseScreen>
      <StatusBar animated />
      <SafeAreaView style={{ flex: 1 }}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            const { velocityY } = nativeEvent;
            if (velocityY <= -100 && !openedModal.current) {
              openedModal.current = true;
              router.push('/add');

              // do not allowe multiple modals to open
              const timer = setTimeout(() => {
                openedModal.current = false;
              }, 1000);

              return () => clearTimeout(timer);
            }
          }}
        >
          <View style={{ flex: 1 }}>
            <View className="w-full flex-row justify-between">
              <Link asChild href="/settings">
                <TouchableOpacity
                  onPress={() => {
                    // generateFakeData();
                  }}
                >
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
              {lastEntry ? (
                <WeightText weight={lastEntry.weight} size="lg" />
              ) : (
                <Text className="dark:text-white text-5xl font-incon_semibold">First Entry</Text>
              )}
            </View>
            <Text className="font-incon text-center text-neutral-500 my-4">
              {lastEntry ? dayjs(lastEntry?.date ?? new Date()).fromNow() : "Let's get started"}
            </Text>

            <View className="mt-6">
              <Animated.View entering={SlideInLeft} className="mb-5">
                {weightGoal ? (
                  <>
                    <WeightText weight={weightGoal.weight} />
                    <Text className="font-incon text-xl text-neutral-500">Weekly Goal</Text>
                  </>
                ) : (
                  <Link asChild href="/settings/goal">
                    <TouchableOpacity>
                      <Text className="dark:text-white text-2xl font-incon_semibold">
                        No Goal Set
                      </Text>
                      <Text className="font-incon text-xl text-neutral-500">Weekly Goal</Text>
                    </TouchableOpacity>
                  </Link>
                )}
              </Animated.View>
              <Animated.View entering={SlideInLeft.delay(300)}>
                <Text className="dark:text-white text-2xl font-incon_semibold">{streak} days</Text>
                <Text className="font-incon text-xl text-neutral-500">Streak</Text>
              </Animated.View>

              <Animated.View entering={SlideInLeft.delay(600)} className="mt-5">
                <Text className="dark:text-white text-2xl font-incon_semibold">
                  {bmi ?? 'Add Height'}
                </Text>
                <Text className="font-incon text-xl text-neutral-500">BMI</Text>
              </Animated.View>
            </View>

            <View className="flex-1" />
          </View>
        </PanGestureHandler>

        <View style={{ marginHorizontal: -32 }}>
          {userHasValidChart ? (
            <LineChart.Provider
              data={userHistory
                .filter((entry) => dayjs().diff(dayjs(entry.date), 'day') <= dateFilter)
                .sort((a, b) => a.date - b.date)
                .map((entry, index) => {
                  if (entry.weight < chartLow.current) chartLow.current = index;
                  if (entry.weight > chartHigh.current) chartHigh.current = index;

                  return {
                    value: entry.weight,
                    timestamp: new Date(entry.weight).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }),
                  };
                })}
            >
              <LineChart height={250}>
                <LineChart.Path color={dark ? 'white' : 'black'}>
                  {/* <LineChart.Tooltip at={chartLow.current} /> */}

                  {/* <LineChart.Tooltip at={chartHigh.current} /> */}
                </LineChart.Path>
                <LineChart.CursorCrosshair>
                  <LineChart.Tooltip position="bottom">
                    <LineChart.DatetimeText
                      style={{
                        fontFamily: 'Inconsolata_600SemiBold',
                        backgroundColor: dark ? '#45444e' : 'black',
                        borderRadius: 4,
                        color: 'white',
                        fontSize: 14,
                        padding: 4,
                      }}
                      format={({ value }) => {
                        'worklet';
                        return runOnJS(formatDate)(value);

                        // return `${dayjs(value).format('MM/DD @ ha').toUpperCase()}`;
                      }}
                    />
                  </LineChart.Tooltip>
                  <LineChart.Tooltip>
                    <LineChart.PriceText
                      style={{
                        fontFamily: 'Inconsolata_600SemiBold',
                        backgroundColor: dark ? '#45444e' : 'black',
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
          ) : (
            <View className="relative">
              <LineChart.Provider data={NO_DATA_WEIGHT}>
                <LineChart style={{ opacity: 0.3 }} height={250}>
                  <LineChart.Path color="grey">
                    {/* <LineChart.Tooltip at={2} />

                <LineChart.Tooltip at={2} /> */}
                  </LineChart.Path>
                </LineChart>

                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.8,
                  }}
                >
                  <View className="bg-[#45444e] rounded-lg">
                    <Text className="px-4 py-2 font-incon_semibold text-[#fefefe]">
                      Not Enough Data
                    </Text>
                  </View>
                </View>
              </LineChart.Provider>
            </View>
          )}
        </View>

        <FlatList
          data={[7, 14, 21]}
          horizontal
          onLayout={onLayout}
          ref={ref}
          // pagingEnabled
          onViewableItemsChanged={({ viewableItems, changed }) => {
            const [item] = viewableItems;
            const key = item.item as number;
            setDateFilter(key);
          }}
          scrollEnabled={userHasValidChart}
          bounces
          style={{ flexGrow: 0, marginBottom: 24 }}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={screenWidth} // Added for custom snapping
          decelerationRate="fast" // Optional, for smoother scrolling
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: screenWidth }}>
                <Text
                  style={{
                    fontFamily: 'Inconsolata_400Regular',
                    textAlign: 'center',
                    color: '#737373',
                    fontSize: 20,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                  }}
                >
                  Last {item} Days
                </Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </BaseScreen>
  );
}
