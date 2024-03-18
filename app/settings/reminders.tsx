import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '~/components/header';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';

export default function RemindersScreen() {
  return (
    <BaseScreen>
      <SafeAreaView>
        <NavHeader showBack />
        <HeaderText text="Reminders" />
      </SafeAreaView>
    </BaseScreen>
  );
}
