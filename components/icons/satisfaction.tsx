import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

interface FaceProps {
  selected?: boolean;
  size?: number;
}

export function HappyFace(props: FaceProps) {
  const { selected, size } = props;
  let iconSize = size || 17;

  return (
    <View
      className={`p-3 bg-green-200 rounded-full self-start ${selected && 'border-[#166534] border p-[10px]'} ${iconSize < 15 && 'p-2'}`}
    >
      <Feather name="smile" color="#166534" size={iconSize} />
    </View>
  );
}

export function NeutralFace(props: FaceProps) {
  const { selected, size } = props;
  let iconSize = size || 17;
  return (
    <View
      className={`p-3 ml-3 bg-yellow-200 rounded-full self-start ${selected && 'border-[#ca8a04] border p-[10px]'} ${iconSize < 15 && 'p-2'}`}
    >
      <Feather name="smile" color="#ca8a04" size={iconSize} />
    </View>
  );
}

export function SadFace(props: FaceProps) {
  const { selected, size } = props;
  let iconSize = size || 17;

  return (
    <View
      className={`p-3 ml-3 bg-red-200 rounded-full self-start ${selected && 'border-[#b91c1c] border p-[10px]'} ${iconSize < 15 && 'p-2'}`}
    >
      <Feather name="smile" color="#b91c1c" size={iconSize} />
    </View>
  );
}

interface SatisfactionIconProps extends FaceProps {
  satisfaction: 'sad' | 'neutral' | 'happy';
}

export default function SatisfactionIcon(props: SatisfactionIconProps) {
  const { satisfaction, ...rest } = props;
  if (satisfaction === 'sad') {
    return <SadFace {...rest} />;
  }

  if (satisfaction === 'neutral') {
    return <NeutralFace {...rest} />;
  }

  if (satisfaction === 'happy') {
    return <HappyFace {...rest} />;
  }

  return null;
}
