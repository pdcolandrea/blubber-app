import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '~/components/header';
import TitleButton from '~/components/title-button';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import { useNumberInput } from '~/lib/user-input';
import { useWeightHistory } from '~/lib/weight-store';

export default function WeightGoals() {
  const [editingWeightGoal, setEditingWeightGoal] = useState(false);
  const weightGoal = useWeightHistory((store) => store.goal);
  const setGoal = useWeightHistory((store) => store.setGoal);

  const { value, onValueCange } = useNumberInput(weightGoal?.weight.toFixed(1) || '0');
  const weightInput = useRef<TextInput>();

  const navigation = useNavigation();

  useEffect(() => {
    if (editingWeightGoal) {
      weightInput.current?.focus();
    }
  }, [editingWeightGoal]);

  const updateGoal = () => {
    setGoal({
      weight: parseFloat(value),
      date: new Date(),
    });
  };

  return (
    <BaseScreen>
      <TouchableOpacity
        onPress={() => {
          updateGoal();
          setEditingWeightGoal(false);
          Keyboard.dismiss();
        }}
        activeOpacity={1}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <NavHeader
            left={
              <TouchableOpacity
                onPress={() => {
                  updateGoal();
                  navigation.goBack();
                }}
              >
                <Feather name="arrow-left" color="#a3a3a3" size={20} />
              </TouchableOpacity>
            }
          />
          <HeaderText text="Weight Goal" />

          <TitleButton
            overrideHeader={
              editingWeightGoal ? (
                <Animated.View
                  entering={FadeInLeft}
                  exiting={FadeOutRight}
                  className="flex-row items-center justify-end"
                >
                  <TextInput
                    className={`text-2xl font-incon_semibold dark:text-white`}
                    value={value}
                    ref={weightInput}
                    keyboardType="decimal-pad"
                    onChangeText={onValueCange}
                  />
                  <Text className="font-incon_semibold text-neutral-500 -mb-1 dark:text-white text-2xl leading-6 self-end">
                    lb
                  </Text>
                </Animated.View>
              ) : (
                <Animated.Text
                  entering={FadeInLeft}
                  exiting={FadeOutRight}
                  className={`text-2xl font-incon_semibold dark:text-white `}
                >
                  {`${weightGoal?.weight.toFixed(1)}lb` || 'No Current Goal'}
                </Animated.Text>
              )
            }
            description="Enter your goal weight. This should be the weight in your dreams."
            onPress={() => {
              if (!editingWeightGoal) {
                setEditingWeightGoal(true);
              }
            }}
          />
        </SafeAreaView>
      </TouchableOpacity>
    </BaseScreen>
  );
}
