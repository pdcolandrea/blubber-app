import clsx from 'clsx';
import { Text, View } from 'react-native';
import { useWeightHistory } from '~/lib/weight-store';

interface WeightTextProps {
  weight: number;
  size?: 'md' | 'lg';
}

export default function WeightText(props: WeightTextProps) {
  const unit = useWeightHistory((store) => store.unit);
  const { weight, size = 'md' } = props;
  return (
    <View className="flex-row items-center">
      <Text
        className={`dark:text-white text-center font-incon_semibold ${size === 'md' && 'text-2xl'} ${size === 'lg' && 'text-7xl'}`}
      >
        {weight}
      </Text>
      <Text
        className={clsx(
          'dark:text-white text-center font-incon',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-7xl'
        )}
      >
        {unit}
      </Text>
    </View>
  );
}
