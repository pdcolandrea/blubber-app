import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useWeightHistory } from '~/lib/weight-store';

export default function ModalScreen() {
  const [weight, setWeight] = useState(0.0);
  const unit = useWeightHistory((store) => store.unit);
  const addEntryMutation = useWeightHistory((store) => store.addEntry);
  const navigation = useNavigation();

  const onWeightChange = useCallback((text: string) => {
    try {
      const newWeight = parseFloat(text);
      if (newWeight >= 1000) return;

      if (isNaN(newWeight)) {
        setWeight(0);
      } else {
        setWeight(newWeight);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const onSubmitEntryPressed = () => {
    addEntryMutation({ date: new Date(), weight });
    navigation.goBack();
  };

  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className="self-center flex-row items-end">
        <TextInput
          autoFocus
          value={weight.toString()}
          onChangeText={onWeightChange}
          className="font-incon_semibold text-7xl"
          keyboardType="decimal-pad"
        />
        <Text className="font-incon text-5xl mb-2 text-neutral-400">lb</Text>
      </View>
      <Text className="text-center font-incon_bold mt-2">You are 3lb fatter than yesterday</Text>

      {/* <Text className="mt-6 font-incon_semibold text-neutral-500">Details</Text>
      <View className="bg-white rounded-lg p-4 mt-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-incon_semibold text-lg">Weight</Text>
          <Text className="font-incon text-lg py-1">
            {weight.toFixed(2)}
            {unit}
          </Text>
        </View>

        <View className="h-[1px] w-[95%] bg-neutral-300 self-center my-3 rounded-full" />
        <View className="flex-row justify-between items-center">
          <Text className="font-incon_semibold text-lg">Date</Text>
          <View className="bg-neutral-200 px-3 py-1 rounded-md">
            <Text className="text-lg">Dec 10, 2024</Text>
          </View>
        </View>
      </View> */}

      <View className="flex-1" />

      <TouchableOpacity onPress={onSubmitEntryPressed} className="w-full bg-stone-800 rounded-xl">
        <Text className="text-xl font-incon_semibold text-center py-3 text-white">Add Weight</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: `flex-1 mt-12 px-6 mb-12`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
