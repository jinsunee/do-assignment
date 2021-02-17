import React, {useState} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ModeType} from '../../types';
import {SvgCalendar} from '../../utils/Icons';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import useTheme from '../../hooks/useTheme';

interface Props {
  expireDate: Date | undefined;
  setExpireDate: (input: Date) => void;
}

function DatePicker(props: Props): React.ReactElement {
  const {expireDate, setExpireDate} = props;
  const {theme} = useTheme();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(
    false,
  );

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setExpireDate(date);
  };

  const renderDatePicker = (): React.ReactElement => {
    if (isDatePickerVisible) {
      if (expireDate) {
        return (
          <>
            <ExpireDateButton onPress={showDatePicker}>
              <ExpireDateText
                focusedColor={theme.font}>{`${expireDate.getFullYear()}/${
                expireDate.getMonth() + 1
              }/${expireDate.getDate()} ${expireDate.getHours()}:${expireDate.getMinutes()}:${expireDate.getSeconds()}`}</ExpireDateText>
            </ExpireDateButton>
            <DateTimePickerModal
              date={expireDate}
              isVisible={isDatePickerVisible}
              mode={ModeType.DATE_TIME}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              isDarkModeEnabled={false}
              textColor={'#000000'}
              locale="ko"
              confirmTextIOS="확인"
              cancelTextIOS="취소"
              headerTextIOS="날짜 선택"
            />
          </>
        );
      }

      return (
        <>
          <ExpireDateButton onPress={showDatePicker}>
            <ExpireDateText>날짜 선택</ExpireDateText>
          </ExpireDateButton>
          <DateTimePickerModal
            date={expireDate}
            isVisible={isDatePickerVisible}
            mode={ModeType.DATE_TIME}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            isDarkModeEnabled={false}
            textColor={'#000000'}
            locale="ko"
            confirmTextIOS="확인"
            cancelTextIOS="취소"
            headerTextIOS="날짜 선택"
          />
        </>
      );
    }

    if (!expireDate) {
      return (
        <>
          <ExpireDateButton onPress={showDatePicker}>
            <ExpireDateText>날짜 선택</ExpireDateText>
          </ExpireDateButton>
        </>
      );
    }

    return (
      <ExpireDateButton onPress={showDatePicker}>
        <ExpireDateText
          focusedColor={theme.font}>{`${expireDate.getFullYear()}/${
          expireDate.getMonth() + 1
        }/${expireDate.getDate()} ${expireDate.getHours()}:${expireDate.getMinutes()}:${expireDate.getSeconds()}`}</ExpireDateText>
      </ExpireDateButton>
    );
  };

  return (
    <Container>
      <SvgCalendar fill={expireDate ? theme.font : colors.blueGray[0]} />
      {renderDatePicker()}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const ExpireDateButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
`;

const ExpireDateText = styled.Text<{
  focusedColor?: string;
}>`
  font-size: 16px;
  font-weight: 500;
  color: ${({focusedColor}) => focusedColor || colors.blueGray[0]};
  margin-top: 5px;
`;

const ExpireDateValueText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.font};
  padding: 5px 0;
  padding-top: 10px;
`;

export default DatePicker;