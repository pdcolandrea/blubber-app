import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link, router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import { LineGraph } from 'react-native-graph';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import BaseScreen from '~/components/ui/base-screen';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const screenWidth = Dimensions.get('window').width;

export default function TabOneScreen() {
  const userHistory = useWeightHistory((store) => store.entries);
  const lastEntry = useWeightHistory((store) => store.lastEntry());
  const generateFakeData = useWeightHistory((store) => store.debugAdd);
  const openedModal = useRef(false);

  const timedEntries = useMemo(() => {
    if (userHistory.length === 0) return {};
    const sinceSeven = userHistory.filter((entry) =>
      dayjs(entry.date).isAfter(dayjs().subtract(7, 'day'))
    );

    return {
      '7d': sinceSeven,
      '14d': [],
    };
  }, [userHistory]);

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
                <TouchableOpacity onPress={() => {}}>
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

            <View className="flex-1" />

            <View style={{ marginHorizontal: -32 }}>
              <LineGraph
                animated
                enablePanGesture
                color="#292524"
                style={{
                  width: '100%',
                  height: 250,
                }}
                points={userHistory.map((entry) => {
                  return {
                    date: new Date(entry.date),
                    value: entry.weight,
                  };
                })}
              />
            </View>

            <FlatList
              data={[7, 14, 21]}
              horizontal
              // pagingEnabled
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
          </View>
        </PanGestureHandler>
      </SafeAreaView>
    </BaseScreen>
  );
}
