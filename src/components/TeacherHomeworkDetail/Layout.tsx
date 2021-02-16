import {BoldText, Header} from '../../shared';

import {HeaderElementType} from '../../types';
import {KeyboardWrapper} from '../../shared';
import React from 'react';
import {SvgMore} from '../../utils/Icons';
import styled from '@emotion/native';

interface Props {
  title: string;
  date?: Date;
  description?: string;
}

function Layout(props: Props): React.ReactElement {
  const {title, date, description} = props;

  const rightElements: HeaderElementType[] = [
    {
      key: 'more button',
      element: <SvgMore />,
      onPressElement: () => console.log('more'),
    },
  ];

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardWrapper>
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          {date ? (
            <Date>
              <BoldText>{`${date?.getFullYear()}/${
                date?.getMonth() + 1
              }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</BoldText>
              까지 제출
            </Date>
          ) : null}
        </Wrapper>
      </KeyboardWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

const TitleWrapper = styled.View`
  padding: 10px 0 20px 0;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
`;

const Date = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.font};
  justify-content: center;
`;

export default Layout;
