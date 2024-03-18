//   export const parseUserNumberInput = (text: string) => {
//     try {
//         const newWeight = parseFloat(text);

import { useState } from 'react';
import { LayoutAnimation } from 'react-native';

//         // if includes decimal, newWeight would otherwise miss 100.X4 place on entry
//         if (text.includes('.')) {
//           // verify that there are only 2 decimal places
//           if (text.split('.')[1].length > 2) {
//             LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//             return;
//           }

//           setWeight(text);
//           return;
//         }

//         // if over 1000, replace last digit with new number
//         if (newWeight >= 1000) {
//           LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//           setWeight(replaceThousandanths(newWeight).toString());
//           return;
//         }

//         if (isNaN(newWeight)) {
//           LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//           setWeight('0');
//         } else {
//           setWeight(newWeight.toString());
//         }
//       } catch (err) {
//         console.warn(err);
//       }

//   }

const replaceThousandanths = (weight: number) => {
  const newLastDigit = weight % 10;
  const preNumber = Math.floor(weight / 100) * 10;
  return preNumber + newLastDigit;
};

export const useNumberInput = (initialValue: string) => {
  const [text, setText] = useState(initialValue);

  const onChangeText = (text: string) => {
    try {
      const newWeight = parseFloat(text);

      // if includes decimal, newWeight would otherwise miss 100.X4 place on entry
      if (text.includes('.')) {
        // verify that there are only 2 decimal places
        if (text.split('.')[1].length > 2) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          return;
        }

        setText(text);
        return;
      }

      // if over 1000, replace last digit with new number
      if (newWeight >= 1000) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setText(replaceThousandanths(newWeight).toString());
        return;
      }

      if (isNaN(newWeight)) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setText('0');
      } else {
        setText(newWeight.toString());
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return { value: text, onValueCange: onChangeText };
};
