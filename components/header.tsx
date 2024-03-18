import { Text } from 'react-native';

interface HeaderTextProps {
  text: string;
}
export default function HeaderText(props: HeaderTextProps) {
  return (
    <Text className="mt-6 mb-10 dark:text-white font-incon_semibold text-5xl">{props.text}</Text>
  );
}
