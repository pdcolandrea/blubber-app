import { Feather } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeatherIcon } from '~/components/icons';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import { useWeightHistory } from '~/lib/weight-store';

export default function SettingsScreen() {
  const deleteAllEntries = useWeightHistory((store) => store.deleteAllEntries);
  const { goBack } = useNavigation();

  const onDeletePress = () => {
    Alert.alert('Are you sure you want to delete your account?', 'This action cannot be undone.', [
      { style: 'cancel', text: 'Never Mind' },
      { style: 'destructive', text: 'Delete', onPress: () => deleteAllEntries() },
    ]);
  };

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <NavHeader showBack />

        <Text className="mt-6 dark:text-white font-incon_semibold text-5xl">Settings</Text>
        <View style={{ flex: 1 }}>
          <Link asChild href="/settings/goal">
            <TouchableOpacity className="mt-10">
              <View className="items-center flex-row">
                <FeatherIcon name="slack" size={17} />
                <Text className="text-2xl font-incon_semibold ml-2 dark:text-white">
                  Weight Goal
                </Text>
              </View>
              <Text className="font-incon text-xl text-neutral-500">
                Edit your jksdj jsdjusj nhere when changing the weight calculation
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <Link asChild href="/settings/motivation">
            <TouchableOpacity className="">
              <View className="items-center flex-row">
                <FeatherIcon name="slack" size={17} />
                <Text className="dark:text-white text-2xl font-incon_semibold ml-2">
                  Motivation
                </Text>
              </View>
              <Text className="font-incon text-xl text-neutral-500">
                Enjoy mean quotes and other things to keep you motivated? Try them here.
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <Link asChild href="/settings/units">
            <TouchableOpacity className="">
              <View className="items-center flex-row">
                <FeatherIcon name="slack" size={17} />
                <Text className="text-2xl dark:text-white font-incon_semibold ml-2">Units</Text>
              </View>
              <Text className="font-incon text-xl text-neutral-500">
                Edit your jksdj jsdjusj nhere when changing the weight calculation
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="my-6 h-[2px] w-2/3 self-center bg-neutral-300 rounded-full" />

          <Link asChild href="/settings/reminders">
            <TouchableOpacity className="">
              <View className="items-center flex-row">
                <FeatherIcon name="slack" size={17} />
                <Text className="text-2xl dark:text-white font-incon_semibold ml-2">Reminders</Text>
              </View>
              <Text className="font-incon text-xl text-neutral-500">
                Edit your jksdj jsdjusj nhere when changing the weight calculation
              </Text>
            </TouchableOpacity>
          </Link>

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
