import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, SlideInDown, SlideInUp } from 'react-native-reanimated';

import { getFailedWeightPrompt } from '~/lib/prompts';
import { useWeightHistory } from '~/lib/weight-store';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const replaceThousandanths = (weight: number) => {
  const newLastDigit = weight % 10;
  const preNumber = Math.floor(weight / 100) * 10;
  return preNumber + newLastDigit;
};

export default function ModalScreen() {
  const unit = useWeightHistory((store) => store.unit);
  const getLastEntry = useWeightHistory((store) => store.lastEntry);
  const addEntryMutation = useWeightHistory((store) => store.addEntry);

  const navigation = useNavigation();
  const lastEntry = getLastEntry();

  const [satisfaction, setSatisfaction] = useState<'happy' | 'neutral' | 'sad'>();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [weight, setWeight] = useState(lastEntry?.weight.toString() ?? '0');
  const weightValue = parseFloat(weight);
  const [photosToAdd, setPhotosToAdd] = useState<string[]>([]);

  const difference = (lastEntry && lastEntry?.weight - weightValue) ?? 0;
  const goodDay = (lastEntry && lastEntry.weight >= weightValue) ?? true;

  const onWeightChange = useCallback((text: string) => {
    try {
      const newWeight = parseFloat(text);

      // if includes decimal, newWeight would otherwise miss 100.X4 place on entry
      if (text.includes('.')) {
        // verify that there are only 2 decimal places
        if (text.split('.')[1].length > 2) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          return;
        }

        setWeight(text);
        return;
      }

      // if over 1000, replace last digit with new number
      if (newWeight >= 1000) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setWeight(replaceThousandanths(newWeight).toString());
        return;
      }

      if (isNaN(newWeight)) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setWeight('0');
      } else {
        setWeight(newWeight.toString());
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const onSubmitEntryPressed = () => {
    addEntryMutation({ date: new Date(), satisfaction, weight: weightValue });
    navigation.goBack();
  };

  const successPrompt = useMemo(() => {}, [weight]);

  const failPrompt = useMemo(() => {
    return getFailedWeightPrompt(Math.abs(difference), dayjs(lastEntry?.date).fromNow());
  }, [weight]);

  const onTakePhotoPressed = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length >= 1) {
        const photo = response.assets[0].uri!;

        setShowPhotoModal(false);
        setPhotosToAdd((photos) => [...photos, photo]);
      }
    });
  };

  const onUploadPhotoPressed = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (response) => {
      if (response.assets && response.assets.length >= 1) {
        let newPhotos: string[] = [];
        response.assets.forEach((asset) => {
          if (asset.uri) {
            newPhotos = [...newPhotos, asset.uri];
          }
        });

        setShowPhotoModal(false);
        setPhotosToAdd((p) => [...p, ...newPhotos]);
      }
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      className={styles.container}
    >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className="self-center flex-row items-end">
        <TextInput
          value={weight}
          editable={!showPhotoModal}
          onChangeText={onWeightChange}
          className="font-incon_semibold text-7xl"
          keyboardType="decimal-pad"
        />
        <Text className="font-incon text-5xl mb-2 text-neutral-400">{unit}</Text>
      </View>

      {(weightValue === 0 || difference === 0) && (
        <Animated.Text
          entering={FadeIn.duration(1000)}
          className="text-center font-incon_bold mt-2"
        >
          Today is your day
        </Animated.Text>
      )}

      {lastEntry && weightValue !== 0 && difference !== 0 && !goodDay && (
        <Animated.Text
          entering={FadeIn.duration(1000)}
          className="text-center font-incon_bold mt-2 text-neutral-500"
        >
          {failPrompt}
        </Animated.Text>
      )}

      {lastEntry && weightValue !== 0 && difference !== 0 && goodDay && (
        <Animated.Text
          entering={FadeIn.duration(1000)}
          className="text-center font-incon_bold mt-2"
        >
          You are {lastEntry.weight - weightValue}
          {unit} skinnier than {dayjs(lastEntry?.date).fromNow()}
        </Animated.Text>
      )}

      <View className="mt-6">
        <View>
          <TouchableOpacity className="mb-5 pr-8 self-start">
            <Text className="text-2xl font-incon_semibold">-</Text>
            <Text className="font-incon text-xl text-neutral-500">Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setShowPhotoModal(true);
            }}
            className="mb-5 pr-8"
          >
            <View className="flex-row items-center">
              <Text className="text-2xl font-incon_semibold mr-2">
                {photosToAdd.length === 0
                  ? '-'
                  : photosToAdd.length === 1
                    ? `1 Photo`
                    : `${photosToAdd.length} Photos`}
              </Text>
              {photosToAdd.length >= 1 && (
                <TouchableOpacity onPress={() => setPhotosToAdd([])}>
                  <Feather name="x" size={15} />
                </TouchableOpacity>
              )}
            </View>
            <Text className="font-incon text-xl text-neutral-500">Photos</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              className={`p-3 bg-green-200 rounded-full self-start ${satisfaction === 'happy' && 'border-[#166534] border p-[10px]'}`}
              onPress={() => setSatisfaction('happy')}
            >
              <Feather name="smile" color="#166534" size={17} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSatisfaction('neutral')}
              className={`p-3 ml-3 bg-yellow-200 rounded-full self-start ${satisfaction === 'neutral' && 'border-[#ca8a04] border p-[10px]'}`}
            >
              <Feather name="smile" color="#ca8a04" size={17} />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-3 ml-3 bg-red-200 rounded-full self-start ${satisfaction === 'sad' && 'border-[#b91c1c] border p-[10px]'}`}
              onPress={() => setSatisfaction('sad')}
            >
              <Feather name="smile" color="#b91c1c" size={17} />
            </TouchableOpacity>
          </View>
          <Text className="font-incon text-xl text-neutral-500">Satisfaction</Text>
        </View>
      </View>

      {/* <Text className="mt-6 font-incon_semibold text-neutral-500">Details</Text>
      <View className="bg-white rounded-lg p-4 mt-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-incon_semibold text-lg">Weight</Text>
          <Text className="font-incon text-lg py-1">
            {weight.toFixed(2)}
            {unit}
          </Text>
        </View>

        <View className="h-[1px] w-[95%] bg-neutral-300 self-center my-3 rounded-full" />
        <View className="flex-row justify-between items-center">
          <Text className="font-incon_semibold text-lg">Date</Text>
          <View className="bg-neutral-200 px-3 py-1 rounded-md">
            <Text className="text-lg">Dec 10, 2024</Text>
          </View>
        </View>
      </View> */}

      <View className="flex-1" />

      <KeyboardAvoidingView keyboardVerticalOffset={180} behavior="padding">
        {!showPhotoModal && (
          <AnimatedTouchableOpacity
            entering={SlideInDown}
            exiting={SlideInUp}
            onPress={onSubmitEntryPressed}
            style={[
              { width: '100%', borderRadius: 12, backgroundColor: '#292524' },
              // addEntryButtonStyle,
            ]}
          >
            <Text className="text-xl font-incon_semibold text-center py-3 text-white">
              Add Entry
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {showPhotoModal && (
          <Animated.View entering={SlideInDown} exiting={SlideInUp} className="flex-row gap-2">
            <View className="flex-row gap-2 w-4/5 items-center">
              <TouchableOpacity
                onPress={onTakePhotoPressed}
                style={[{ borderRadius: 12, backgroundColor: '#292524', flex: 1 }]}
              >
                <Text className="text-xl font-incon_semibold text-center py-3 text-white">
                  Take
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onUploadPhotoPressed}
                style={[{ borderRadius: 12, backgroundColor: '#292524', flex: 1 }]}
              >
                <Text className="text-xl font-incon_semibold text-center py-3 text-white">
                  Upload
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                setShowPhotoModal(false);
              }}
              style={[
                {
                  borderRadius: 12,
                  backgroundColor: '#292524',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Feather name="x" color="white" size={15} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
}

const styles = {
  container: `flex-1 mt-12 px-6 mb-8`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
