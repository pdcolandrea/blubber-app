import { useLocalSearchParams } from 'expo-router';
import { Text, Image } from 'react-native';
import BaseScreen from '~/components/ui/base-screen';
import { retreivePathsForEntries } from '~/lib/image-filesystem';
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

  const images = retreivePathsForEntries(entry.images);

  return (
    <BaseScreen>
      <Text>entry</Text>
      <Image source={{ uri: images[0] }} style={{ width: 200, height: 200 }} />
      <Text>{JSON.stringify(entry)}</Text>
    </BaseScreen>
  );
}
