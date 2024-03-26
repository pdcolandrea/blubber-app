import { Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '~/components/header';
import { DescriptionText } from '~/components/text';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import { useUserSettings } from '~/lib/user-store';

export default function EditMotivationScreen() {
  const hardMode = useUserSettings((store) => store.hardMode);
  const toggleHardMode = useUserSettings((store) => store.toggleHardMode);

  return (
    <BaseScreen>
      <SafeAreaView>
        <NavHeader showBack />
        <HeaderText text="Motivation" />

        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-incon_semibold dark:text-white text-2xl">"Hard" Motiviation</Text>
            <DescriptionText>
              This will show you mean quotes and other things to keep you motivated.
            </DescriptionText>
          </View>
          <Switch value={hardMode} onChange={(e) => toggleHardMode()} />
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
