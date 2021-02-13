import React from 'react';
import {TextInputProps} from 'react-native';
import {colors} from '../utils/theme';
import styled from '@emotion/native';

interface Props {
  title?: string;
  subTitleText?: string;
  warningText?: string;
  warnignColor?: string;
  textInputProps: TextInputProps;
}

function TextInputBox(props: Props): React.ReactElement {
  const {
    title = 'TextInput Title',
    subTitleText = '',
    warningText = '',
    warnignColor = colors.negative,
    textInputProps,
  } = props;

  return (
    <Container>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{subTitleText}</SubTitle>
      </TitleWrapper>
      <Input
        {...textInputProps}
        placeholderTextColor={colors.blueGrey}
        warning={warningText ? true : false}
        warnignColor={warnignColor}
      />
      <WarningWrapper>
        <WarningText color={warnignColor}>{warningText}</WarningText>
      </WarningWrapper>
    </Container>
  );
}

const Container = styled.View`
  padding-bottom: 5px;
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

const SubTitle = styled.Text`
  font-size: 11px;
  color: ${colors.blueGrey};
`;

const Input = styled.TextInput<{
  warning: boolean;
  warnignColor: string;
}>`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.font};
  padding: 10px 0;
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${({warning, warnignColor}) =>
    warning ? warnignColor : colors.blueGrey};
`;

const WarningWrapper = styled.View`
  height: 25px;
  padding-top: 3px;
`;

const WarningText = styled.Text<{
  color: string;
}>`
  font-weight: bold;
  color: ${({color}) => color};
  font-size: 12px;
`;

export default TextInputBox;
