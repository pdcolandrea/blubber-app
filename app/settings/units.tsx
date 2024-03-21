import { Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '~/components/header';
import { DescriptionText } from '~/components/text';
import BaseScreen from '~/components/ui/base-screen';
import NavHeader from '~/components/ui/nav-header';
import { useWeightHistory } from '~/lib/weight-store';

export default function EditUnitsScreen() {
  const unit = useWeightHistory((store) => store.unit);
  const setUnit = useWeightHistory((store) => store.setUnit);

  return (
    <BaseScreen>
      <SafeAreaView>
        <NavHeader showBack />
        <HeaderText text="Units" />

        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-incon_semibold text-2xl">Use Pounds</Text>
            <DescriptionText>
              This will allow you to switch between pounds and kilograms for weight measurements.
            </DescriptionText>
          </View>
          <Switch
            value={unit === 'lb'}
            onChange={() => {
              if (unit === 'kg') {
                setUnit('lb');
              } else {
                setUnit('kg');
              }
            }}
          />
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
}
