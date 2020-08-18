import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from "./styles";

import api from "../../services/api";

// to retrieve the params passed in the route
interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams; // strongly typing so we can retrieve the providerID from the params
  const { user } = useAuth(); // to handle the user authenticated
  const { goBack } = useNavigation(); // handles the back button navigation
  const [providers, setProviders] = useState<Provider[]>([]); // state that holds all providers from api call
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId); //handles the clicked user

  useEffect(() => {
    // retrieve providers list from API
    api.get("providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    //sends the user back to the previous page
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    // when a new provider is clicked/selected
    setSelectedProvider(providerId);
  }, []);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <HeaderTitle>Barbers</HeaderTitle>

          <UserAvatar source={{ uri: user.avatar_url }} />
        </Header>

        <ProvidersListContainer>
          <ProvidersList
            data={providers} // tells where the data is coming from
            horizontal //makes the list horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => {
                  handleSelectProvider(provider.id); // every time we call a function that has a parameter, we need to use an arrow function before
                }}
                selected={provider.id === selectedProvider} // props used to change the colour based on the selected provider
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName
                  selected={provider.id === selectedProvider} // props used to change the colour based on the selected provider
                >
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          ></ProvidersList>
        </ProvidersListContainer>
      </Container>
    </>
  );
};

export default CreateAppointment;
