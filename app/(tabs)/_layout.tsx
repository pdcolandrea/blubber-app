import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Slot, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useUserSettings } from '~/lib/user-store';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  const hasOnboarded = useUserSettings((store) => store.hasOnboarded);

  if (!hasOnboarded) {
    return <Redirect href="/onboard/" />;
  }

  return (
    <Slot />
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: 'black',
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Tab One',
    //       headerShown: false,
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //       headerRight: () => (
    //         <Link href="/modal" asChild>
    //           <Pressable>
    //             {({ pressed }) => (
    //               <FontAwesome
    //                 name="info-circle"
    //                 size={25}
    //                 color="gray"
    //                 style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
    //               />
    //             )}
    //           </Pressable>
    //         </Link>
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="two"
    //     options={{
    //       title: 'Tab Two',
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
