import React, {useEffect, useState} from 'react';
import {MssModal} from '../mssModal/MssModal';
import {MssInput} from '../mssInput/MssInput';
import {
  KeyboardTypeOptions,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../mssButton/MssButton';

type InputModalProps = {
  label: string;
  value: string;
  visible: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onSwipeComplete: () => void;
  onOkButtonPress: (text: string) => void;
  onBackdropPress?: () => void;
};

export const InputModal = (props: InputModalProps) => {
  const {
    label,
    value,
    visible,
    placeholder,
    keyboardType,
    onBackdropPress,
    onOkButtonPress,
    onSwipeComplete,
  } = props;

  const [text, setText] = useState(value);
  const [input, setInput] = useState<TextInput | null>(null);

  useEffect(() => {
    if (visible) {
      setText(value);
    }
  }, [value, visible]);

  const handleShowModal = () => {
    if (input && Platform.OS === 'ios') {
      input.focus();
    }
  };

  const handleStartHidingModal = () => {
    if (input) {
      input.blur();
    }
  };

  const handleInputClearButtonPress = () => {
    setText(keyboardType === 'numeric' ? '0' : '');
  };

  const handleOkButtonPress = () => {
    onOkButtonPress(text);
    onSwipeComplete();
  };

  return (
    <MssModal
      style={styles.modal}
      scrollTo={() => {}}
      scrollOffset={undefined}
      visible={visible}
      avoidKeyboard={true}
      onSwipeComplete={onSwipeComplete}
      onBackdropPress={onBackdropPress}
      onModalShow={handleShowModal}
      onModalWillHide={handleStartHidingModal}>
      <View style={styles.mainContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <MssInput
          autoFocus={Platform.OS === 'android'}
          parentRef={setInput}
          placeholder={placeholder}
          value={text}
          onChangeText={setText}
          pointerEvents="none"
          keyboardType={keyboardType}
          onClearButtonPress={handleInputClearButtonPress}
        />
        <View style={styles.buttonContainer}>
          <MssButton
            style={styles.cancelButton}
            color={COLORS.BACKGROUND_1}
            textColor={COLORS.SECONDARY_DARK_1}
            label="Отмена"
            onPress={onSwipeComplete}
          />
          <MssButton
            style={styles.okButton}
            label="Ок"
            onPress={handleOkButtonPress}
          />
        </View>
      </View>
    </MssModal>
  );
};
