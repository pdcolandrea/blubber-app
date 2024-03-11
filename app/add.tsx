import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import WeightText from '~/components/weight-text';
import { useWeightHistory } from '~/lib/weight-store';

export default function ModalScreen() {
  const [weight, setWeight] = useState(0.0);
  const [satisfaction, setSatisfaction] = useState<'happy' | 'neutral' | 'sad'>();
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
    addEntryMutation({ date: new Date(), satisfaction, weight });
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className="self-center flex-row items-end">
        <TextInput
          autoFocus
          value={weight.toString()}
          onChangeText={onWeightChange}
          className="font-incon_semibold text-7xl"
          keyboardType="decimal-pad"
        />
        <Text className="font-incon text-5xl mb-2 text-neutral-400">{unit}</Text>
      </View>
      <Text className="text-center font-incon_bold mt-2">You are 3lb fatter than yesterday</Text>

      <View className="mt-6">
        <View>
          <TouchableOpacity className="mb-5 pr-8 self-start">
            <Text className="text-2xl font-incon_semibold">-</Text>
            <Text className="font-incon text-xl text-neutral-500">Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mb-5 pr-8">
            <Text className="text-2xl font-incon_semibold">-</Text>
            <Text className="font-incon text-xl text-neutral-500">Photos</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              className={`p-3 bg-green-200 rounded-full self-start ${satisfaction === 'happy' && 'border-[#166534] border p-[10px]'}`}
              onPress={() => setSatisfaction('happy')}>
              <Feather name="smile" color="#166534" size={17} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSatisfaction('neutral')}
              className={`p-3 ml-3 bg-yellow-200 rounded-full self-start ${satisfaction === 'neutral' && 'border-[#ca8a04] border p-[10px]'}`}>
              <Feather name="smile" color="#ca8a04" size={17} />
            </TouchableOpacity>

            <View className="p-3 ml-3 bg-red-200 rounded-full self-start">
              <Feather name="smile" color="#b91c1c" size={17} />
            </View>
          </View>
        </View>
        <Text className="font-incon text-xl text-neutral-500">Satisfaction</Text>
      </View>

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

      <KeyboardAvoidingView keyboardVerticalOffset={180} behavior="padding">
        <TouchableOpacity
          onPress={onSubmitEntryPressed}
          style={{ width: '100%', borderRadius: 12, backgroundColor: '#292524' }}>
          <Text className="text-xl font-incon_semibold text-center py-3 text-white">Add Entry</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
}

const styles = {
  container: `flex-1 mt-12 px-6 mb-12`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
