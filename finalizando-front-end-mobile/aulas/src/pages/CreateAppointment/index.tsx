import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StatusBar, Platform, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format, isAfter, endOfDay } from 'date-fns';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionHours,
  Hour,
  Content,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  );

  useEffect(() => {
    api.get<Provider[]>('providers').then(({ data }) => {
      setProviders(data);
    });
  }, []);

  useEffect(() => {
    setAvailabilityLoading(true);
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        setAvailabilityLoading(false);
        setAvailability(data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }
  }, []);

  const handleDateChange = useCallback((_, date: Date | undefined) => {
    setShowDatePicker(oldState => !oldState);
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    const formattedDate = new Date(selectedDate);

    formattedDate.setHours(selectedHour);
    formattedDate.setMinutes(0);

    if (selectedHour === 0) {
      return Alert.alert(
        'Escolha um horário',
        'Por favor selecione um dos horários disponíveis para agendamento'
      );
    }

    try {
      await api.post('appointments', {
        provider_id: selectedProvider,
        date: formattedDate,
      });

      const chosenProvider = providers.find(
        provider => provider.id === selectedProvider
      );

      navigate('AppointmentCreated', {
        date: formattedDate.getTime(),
        provider_name: chosenProvider?.name,
      });
    } catch {
      Alert.alert(
        'Erro na criação de seu agendamento',
        'Ocorreu um erro ao tentar criar seu agendamento, tente novamente'
      );
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate, providers]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const buttonEnabled = useMemo(() => {
    return isAfter(endOfDay(selectedDate), new Date());
  }, [selectedDate]);

  return (
    <Container>
      <StatusBar backgroundColor="#28262e" />
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({ id }) => id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              onChange={handleDateChange}
              display="calendar"
              textColor="#f4ede8"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            {availabilityLoading ? (
              <ActivityIndicator size="large" color="#999" />
            ) : (
              <SectionHours>
                {morningAvailability.map(
                  ({ hour, formattedHour, available }) => (
                    <Hour
                      enabled={available}
                      selected={hour === selectedHour}
                      available={available}
                      key={formattedHour}
                      onPress={() => handleSelectHour(hour)}
                    >
                      <HourText selected={hour === selectedHour}>
                        {formattedHour}
                      </HourText>
                    </Hour>
                  )
                )}
              </SectionHours>
            )}
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            {availabilityLoading ? (
              <ActivityIndicator size="large" color="#999" />
            ) : (
              <SectionHours>
                {afternoonAvailability.map(
                  ({ hour, formattedHour, available }) => (
                    <Hour
                      enabled={available}
                      selected={hour === selectedHour}
                      available={available}
                      key={formattedHour}
                      onPress={() => handleSelectHour(hour)}
                    >
                      <HourText selected={hour === selectedHour}>
                        {formattedHour}
                      </HourText>
                    </Hour>
                  )
                )}
              </SectionHours>
            )}
          </Section>
        </Schedule>

        <CreateAppointmentButton
          enabled={buttonEnabled}
          onPress={handleCreateAppointment}
        >
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
