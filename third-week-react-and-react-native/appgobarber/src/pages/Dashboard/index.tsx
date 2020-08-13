import React, { useCallback, useEffect, useState } from "react";
import { View, Button } from "react-native";

import { useAuth } from "../../hooks/auth"; // hook that handles authentication

import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from "./styles";

export interface Provider {
  // every time we use an object/array inside the useState, it's recommended to have an interface
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]); // store providers from API

  const { signOut, user } = useAuth(); // handle authenticated user
  const { navigate } = useNavigation(); // handle routing

  useEffect(() => {
    api.get("providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    // navigate("Profile");
    signOut();
  }, [navigate]);

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>
            Welcome, {"\n"} {/* to break a line, same as <br> */}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </ProfileButton>
        </Header>

        <ProvidersList
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item }) => ( /* each item from the provider */
            <UserName>{item.name}</UserName>
          )} 
        />
      </Container>
    </>
  );
};

export default Dashboard;
