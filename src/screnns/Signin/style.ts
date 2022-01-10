import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
`;

export const SigninTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 67px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({theme}) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`;


export const ButtonLoginSocial = styled.TouchableOpacity`
   background-color: ${({theme}) => theme.colors.shape};
   border-radius: 5px;
   align-items: center;
   flex-direction: row;
   margin-bottom: 16px;
   height: ${RFValue(56)}px;
`;

export const IconRedeSocial = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;
`;

export const TextRedeSocial = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;
