import { Feather } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeatherIcon } from '~/components/icons';
import TitleButton from '~/components/title-button';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import { deleteImagesFromFileSystem } from '~/lib/image-filesystem';
import { useWeightHistory } from '~/lib/weight-store';

const Seperator = () => {
  return <View className="my-6 h-[1px] w-2/3 self-center bg-neutral-300 rounded-full" />;
};

export default function SettingsScreen() {
  const entries = useWeightHistory((store) => store.entries);
  const deleteAllEntries = useWeightHistory((store) => store.deleteAllEntries);
  const { goBack } = useNavigation();
  const router = useRouter();

  const handleDeletion = () => {
    try {
      entries.forEach((e) => {
        if (e.images && e.images.length >= 1) {
          deleteImagesFromFileSystem(e.images);
        }
      });
    } catch (err) {
      console.warn(err.messaage);
    }
    deleteAllEntries();
    router.navigate('/(tabs)/');
  };

  const onDeletePress = () => {
    Alert.alert('Are you sure you want to delete your account?', 'This action cannot be undone.', [
      { style: 'cancel', text: 'Never Mind' },
      { style: 'destructive', text: 'Delete', onPress: handleDeletion },
    ]);
  };

  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <NavHeader showBack />

        <Text className="mt-6 mb-10 dark:text-white font-incon_semibold text-5xl">Settings</Text>
        <View style={{ flex: 1 }}>
          <Link asChild href="/settings/goal">
            <TitleButton
              header="Weight Goal"
              description="Edit your jksdj jsdjusj nhere when changing the weight calculation"
              icon={<FeatherIcon name="slack" size={17} />}
              showCaret
            />
          </Link>
          <Seperator />
          <Link asChild href="/settings/motivation">
            <TitleButton
              header="Motivation"
              icon={<FeatherIcon name="slack" size={17} />}
              description="Enjoy mean quotes and other things to keep you motivated? Thats here."
              showCaret
            />
          </Link>
          <Seperator />
          <Link asChild href="/settings/units">
            <TitleButton
              header="Units"
              icon={<FeatherIcon name="slack" size={17} />}
              description="Edit your jksdj jsdjusj nhere when changing the weight calculation"
              showCaret
            />
          </Link>
          {/* <Seperator />
          <Link asChild href="/settings/reminders">
            <TitleButton
              header="Reminders"
              icon={<FeatherIcon name="slack" size={17} />}
              description="Edit your jksdj jsdjusj nhere when changing the weight calculation"
              showCaret
            />
          </Link> */}

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
