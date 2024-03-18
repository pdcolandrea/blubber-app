import { TouchableOpacity, View, Text } from 'react-native';
import { FeatherIcon } from './icons';

interface TitleButtonProps {
  header?: string;
  description: string;
  icon?: React.ReactNode;
  showCaret?: boolean;
  onPress?: () => void;
  overrideHeader?: React.ReactNode;
}

export default function TitleButton(props: TitleButtonProps) {
  const { header, description, overrideHeader, icon, showCaret, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} className="pr-6 flex-row items-center justify-between">
      <View className="">
        <View className="items-center flex-row">
          {/* display icon */}
          {icon && icon}

          {/* override left header if passed in */}
          {overrideHeader ? (
            overrideHeader
          ) : (
            <Text
              className={`text-2xl font-incon_semibold ml-2 dark:text-white ${!icon && 'ml-0'}`}
            >
              {header}
            </Text>
          )}
        </View>
        <Text className="font-incon text-xl text-neutral-500">{description}</Text>
      </View>

      {showCaret && <FeatherIcon name="chevron-right" size={20} />}
    </TouchableOpacity>
  );
}
