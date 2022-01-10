import React, {useContext} from 'react'
import { Button, Text } from 'react-native'
import { SigninSocialButton } from '../../components/SigninSocialButton'
import { Alert, TouchableOpacity } from 'react-native'
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
    TextRedeSocial
    
} from './style'

import AppleSvg from '../../assets/apple-icon.svg'
import GoogleSvg from '../../assets/google-icon.svg'
import LogoSvg from '../../assets/logo-icon.svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAuth } from '../../hooks/auth'

export function Signin(){

    const {signInWithGoogle} = useAuth();
        
    async function handleSignInWithGoogle() {       
        try {
            await signInWithGoogle();

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google.')
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SigninTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SigninTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <ButtonLoginSocial
                    activeOpacity={0.8}
                    onPress={handleSignInWithGoogle}>
                        <IconRedeSocial>
                            <GoogleSvg/>
                        </IconRedeSocial>
                        <TextRedeSocial>
                            Entrar com Google
                        </TextRedeSocial>
                    </ButtonLoginSocial>

                    <ButtonLoginSocial
                    activeOpacity={0.8}
                    >
                        <IconRedeSocial>
                            <AppleSvg/>
                        </IconRedeSocial>
                        <TextRedeSocial>
                            Entrar com a Apple
                        </TextRedeSocial>
                    </ButtonLoginSocial>
                </FooterWrapper>
            
            </Footer>
        </Container>
    );
}



  
  