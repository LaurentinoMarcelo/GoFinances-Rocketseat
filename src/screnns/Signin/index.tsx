import React from 'react'
import { SigninSocialButton } from '../../components/SigninSocialButton'
import { 
    Container,
    Header,
    TitleWrapper, 
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from './style'

import AppleSvg from '../../assets/apple-icon.svg'
import GoogleSvg from '../../assets/google-icon.svg'
import LogoSvg from '../../assets/logo-icon.svg'
import { RFValue } from 'react-native-responsive-fontsize'

export function Signin(){
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
                   <SigninSocialButton
                   title='Entrar com Google'
                   svg={GoogleSvg}/>

                   <SigninSocialButton
                   title='Entrar com Apple'
                   svg={AppleSvg}/>
                </FooterWrapper>
               
            </Footer>
        </Container>
    );
}