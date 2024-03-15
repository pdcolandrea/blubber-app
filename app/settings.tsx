import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseScreen from '~/components/ui/base-screen';
import { useWeightHistory } from '~/lib/weight-store';

export default function SettingsScreen() {
  const deleteAllEntries = useWeightHistory((store) => store.deleteAllEntries);
  const { goBack } = useNavigation();

  const onDeletePress = () => {
    console.log('deleting all entries');
    deleteAllEntries();
  };

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="w-full flex-row justify-between">
          <TouchableOpacity onPress={goBack}>
            <Feather name="arrow-left" color="#a3a3a3" size={20} />
          </TouchableOpacity>
        </View>

        {/* <Text className="mt-6 font-incon_semibold text-4xl">Settings</Text> */}
        <View style={{ flex: 1 }}>
          <View className="mt-10">
            <View className="items-center flex-row">
              <Feather name="slack" color="black" size={17} />
              <Text className="text-2xl font-incon_semibold ml-2">Weight Goal</Text>
            </View>
            <Text className="font-incon text-xl text-neutral-500">
              Edit your jksdj jsdjusj nhere when changing the weight calculation
            </Text>
          </View>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <TouchableOpacity className="">
            <View className="items-center flex-row">
              <Feather name="slack" color="black" size={17} />
              <Text className="text-2xl font-incon_semibold ml-2">Motivation</Text>
            </View>
            <Text className="font-incon text-xl text-neutral-500">
              Enjoy mean quotes and other things to keep you motivated? Try them here.
            </Text>
          </TouchableOpacity>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <TouchableOpacity className="">
            <View className="items-center flex-row">
              <Feather name="slack" color="black" size={17} />
              <Text className="text-2xl font-incon_semibold ml-2">Units</Text>
            </View>
            <Text className="font-incon text-xl text-neutral-500">
              Edit your jksdj jsdjusj nhere when changing the weight calculation
            </Text>
          </TouchableOpacity>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <View className="">
            <View className="items-center flex-row">
              <Feather name="slack" color="black" size={17} />
              <Text className="text-2xl font-incon_semibold ml-2">Reminders</Text>
            </View>
            <Text className="font-incon text-xl text-neutral-500">
              Edit your jksdj jsdjusj nhere when changing the weight calculation
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={onDeletePress}
              className="bg-red-200 items-center justify-center py-3 rounded-lg border-red-700 border"
            >
              <Text className="font-incon_semibold text-red-700 text-xl">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
