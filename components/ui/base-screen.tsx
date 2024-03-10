import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import clsx from 'clsx';

interface BaseScreenProps extends ViewProps {
  fullScreen?: boolean;
}

export default function BaseScreen(props: BaseScreenProps) {
  const { children, fullScreen, className, ...rest } = props;
  return (
    <View
      {...rest}
      className={clsx(
        'flex-1 bg-[#F8F7FE] dark:bg-red-500 pt-4',
        fullScreen ? 'px-0 pt-0' : 'px-8',
        className
      )}>
      {children}
    </View>
  );
}
