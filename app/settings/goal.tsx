import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';

export default function WeightGoals() {
  return (
    <BaseScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <NavHeader showBack />
        <Text>H</Text>
      </SafeAreaView>
    </BaseScreen>
  );
}
