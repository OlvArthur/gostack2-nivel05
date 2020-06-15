import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OKButton,
  OKButtonText,
} from './styles';

interface RouteParams {
  date: number;
  provider_name: string;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const { date, provider_name } = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      date,
      `EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h com ${provider_name}'`,
      {
        locale: ptBR,
      }
    );
  }, [date, provider_name]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04D361" />

      <Title>Agendamento{'\n'}Concluido</Title>
      <Description>{formattedDate}</Description>

      <OKButton onPress={handleOkPressed}>
        <OKButtonText>Ok</OKButtonText>
      </OKButton>
    </Container>
  );
};

export default AppointmentCreated;
