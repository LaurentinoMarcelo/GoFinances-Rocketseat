import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg';

import {
    Button,
    ImageContainer,
    Text,
} from './style';

interface Props{
    title: string;
    svg:React.FC<SvgProps>
}

export function SigninSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props){
    return(
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>

            <Text>
                {title}
            </Text>
        </Button>
    );
}