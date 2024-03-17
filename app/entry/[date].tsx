import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import BaseScreen from '~/components/ui/base-screen';

export default function WeightEntryScreen() {
  const params = useLocalSearchParams<{ date: string }>();

  return (
    <BaseScreen>
      <Text>entry</Text>
    </BaseScreen>
  );
}
