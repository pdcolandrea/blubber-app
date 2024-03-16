import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

interface FeatherIconProps {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
}

export function FeatherIcon(props: FeatherIconProps) {
  const { dark } = useTheme();
  const color = props.color || (dark ? 'white' : 'black');
  const size = props.size;

  return <Feather name={props.name} color={color} size={size} />;
}
