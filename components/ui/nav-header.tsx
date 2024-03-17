import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

interface NavHeaderProps {
  showBack?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function NavHeader(props: NavHeaderProps) {
  const { left, right, showBack } = props;
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row justify-between">
      {left ? (
        left
      ) : showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color="#a3a3a3" size={20} />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {right && right}
    </View>
  );
}
