import React, { useContext, useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import { useTheme } from "styled-components";
import { Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
  ButtonLoginSocial,
  IconRedeSocial,
  TextRedeSocial,
} from "./style";

import AppleSvg from "../../assets/apple-icon.svg";
import GoogleSvg from "../../assets/google-icon.svg";
import LogoSvg from "../../assets/logo-icon.svg";
import { RFValue } from "react-native-responsive-fontsize";
import {Platform} from 'react-native';

import { useAuth } from "../../hooks/auth";

export function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SigninTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <ButtonLoginSocial
            activeOpacity={0.8}
            onPress={handleSignInWithGoogle}
          >
            <IconRedeSocial>
              <GoogleSvg />
            </IconRedeSocial>
            <TextRedeSocial>Entrar com Google</TextRedeSocial>
          </ButtonLoginSocial>

        {
            Platform.OS === 'ios' &&
            <ButtonLoginSocial
            activeOpacity={0.8}
            onPress={handleSignInWithApple}
          >
            <IconRedeSocial>
              <AppleSvg />
            </IconRedeSocial>
            <TextRedeSocial>Entrar com a Apple</TextRedeSocial>
          </ButtonLoginSocial>
        }
          


        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
