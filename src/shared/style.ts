import styled from '@emotion/native';

export const Container = styled.View<{
  paddingTop?: number;
}>`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  padding-top: ${({paddingTop}) => paddingTop || 0}px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;
