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
        <Container>
            <Header>
                <Title>{title}</Title>
                <Icon name={icon[type]}/>
            </Header>

            <Footer>
                <Amount>{amount}</Amount>
                <LastTransaction>{lastTransation}</LastTransaction>
            </Footer>

        </Container>
    )
}