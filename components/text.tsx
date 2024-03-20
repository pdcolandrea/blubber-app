import clsx from 'clsx';
import { Text, TextProps } from 'react-native';

export function DescriptionText(props: TextProps) {
  const { className, ...rest } = props;
  return <Text className={clsx('font-incon text-xl text-neutral-500', className)} {...rest} />;
}
