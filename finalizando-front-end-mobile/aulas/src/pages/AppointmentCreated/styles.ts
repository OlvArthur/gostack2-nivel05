import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 30px;
  color: #f4ede8;
  margin: 24px 64px 16px;
  text-align: center;
`;

export const Description = styled.Text`
  margin: 0 30px 40px;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;

export const OKButton = styled(RectButton)`
  background: #ff9000;
  padding: 17px 40px;
  border-radius: 10px;
`;

export const OKButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #312e38;
`;
