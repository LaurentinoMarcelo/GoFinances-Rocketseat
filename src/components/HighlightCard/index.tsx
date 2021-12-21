import * as React from 'react';

import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
 } from './styles';

 interface Props {
     title: string,
     amount: string,
     lastTransation: string,
     type: 'up' | 'total' | 'down'
 }

 const icon = {
     up: 'arrow-up-circle',
     down: 'arrow-down-circle',
     total: 'dollar-sign'
 }

export function HighlightCard({
    title, 
    amount, 
    lastTransation,
    type
} : Props){
    return(
        <Container type={type}>
            <Header>
                <Title type={type}>
                    {title}
                    </Title>
                <Icon 
                    name={icon[type]} 
                    type={type}
                />
            </Header>

            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransation}
                </LastTransaction>
            </Footer>

        </Container>
    )
}