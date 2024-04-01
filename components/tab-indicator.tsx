import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  StretchInX,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface TabIndicatorProps {
  totalTabs: number;
  activeTab: number;
}

export default function TabIndicator({ totalTabs, activeTab }: TabIndicatorProps) {
  const widthValues = Array.from({ length: totalTabs }, () => useSharedValue(10));

  // Update the width values when activeTab changes
  React.useEffect(() => {
    widthValues.forEach((value, index) => {
      value.value = withTiming(index === activeTab ? 30 : 10, { duration: 300 });
    });
  }, [activeTab, widthValues]);

  return (
    <View className="flex-row self-center mt-6">
      {widthValues.map((widthValue, i) => {
        const animatedStyle = useAnimatedStyle(() => ({
          width: widthValue.value,
        }));

        return (
          <Animated.View
            key={i}
            style={[
              {
                marginHorizontal: 3,
                height: 10,
                borderRadius: 300,
                backgroundColor: i === activeTab ? 'black' : 'gray',
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
}
