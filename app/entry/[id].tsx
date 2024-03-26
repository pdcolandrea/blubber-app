import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import BaseScreen from '~/components/ui/base-screen';
import { useWeightHistory } from '~/lib/weight-store';

export default function WeightEntryScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const entry = useWeightHistory((store) => store.getEntry(parseInt(params.id)));

  if (!entry) {
    return (
      <BaseScreen>
        <Text>Entry not found</Text>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <Text>entry</Text>
      <Text>{JSON.stringify(entry)}</Text>
    </BaseScreen>
  );
}
