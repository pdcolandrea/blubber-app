import { StatusBar } from 'expo-status-bar';
import { Platform, Text, TextInput, View } from 'react-native';

import { useCallback, useState } from 'react';

export default function ModalScreen() {
  const [weight, setWeight] = useState(0.0);

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

      <Text className="mt-6 font-incon_semibold text-neutral-500">Details</Text>
      <View className="bg-white rounded-lg p-4 mt-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-incon">Weight</Text>
          <Text className="font-incon">{weight.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: `flex-1 mt-12 px-6`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
