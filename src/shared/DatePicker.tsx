import React, {useState} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ModeType} from '../types';
import {colors} from '../utils/theme';
import styled from '@emotion/native';

interface Props {
  title: string;
  expireDate: Date;
  setExpireDate: (input: Date) => void;
  warningExpireDate: string;
}

function DatePicker(props: Props): React.ReactElement {
  const {title, expireDate, setExpireDate, warningExpireDate} = props;

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

  const renderWarning = (): React.ReactElement => {
    return (
      <WarningWrapper>
        <WarningText>{warningExpireDate || ''}</WarningText>
      </WarningWrapper>
    );
  };

  const renderDatePicker = (): React.ReactElement => {
    if (isDatePickerVisible) {
      if (expireDate) {
        return (
          <>
            <ExpireDateButton onPress={showDatePicker}>
              <ExpireDateValueText>{`${expireDate.getFullYear()}년 ${
                expireDate.getMonth() + 1
              }월 ${expireDate.getDate()}일 ${expireDate.getHours()}시${expireDate.getMinutes()}분`}</ExpireDateValueText>
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
            {renderWarning()}
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
          {renderWarning()}
        </>
      );
    }

    if (!expireDate) {
      return (
        <>
          <ExpireDateButton onPress={showDatePicker}>
            <ExpireDateText>날짜 선택</ExpireDateText>
          </ExpireDateButton>
          {renderWarning()}
        </>
      );
    }

    return (
      <ExpireDateButton onPress={showDatePicker}>
        <ExpireDateText>{`${expireDate.getFullYear()}년 ${
          expireDate.getMonth() + 1
        }월 ${expireDate.getDate()}일 ${expireDate.getHours()}시${expireDate.getMinutes()}분`}</ExpireDateText>
      </ExpireDateButton>
    );
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      {renderDatePicker()}
    </Container>
  );
}

const Container = styled.View`
  padding-bottom: 10px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${({theme}) => theme.font};
  margin-right: 5px;
`;

const ExpireDateButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.blueGrey};
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
`;

const ExpireDateText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.blueGrey};
  margin-top: 5px;
`;

const ExpireDateValueText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.font};
  padding: 5px 0;
  padding-top: 10px;
`;

const WarningWrapper = styled.View`
  height: 25px;
  padding-top: 3px;
`;

const WarningText = styled.Text`
  font-weight: bold;
  color: ${({theme}) => theme.negative};
  font-size: 12px;
`;

export default DatePicker;
