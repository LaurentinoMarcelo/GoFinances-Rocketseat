import React from 'react';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGretting,
    UserName,
    Icon,
    HighlightCards,
    Trasations,
    Title
} from './styles'
import { RFValue } from 'react-native-responsive-fontsize';

import { HighlightCard } from '../../components/HighlightCard';
import { TransationCard } from '../../components/TransationCard';


export function Dashboard(){
    const data = {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: { 
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/06/2021'
    };

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                        source={{uri: 'https://github.com/LaurentinoMarcelo.png'}}>
                        </Photo>
                        <User>
                            <UserGretting>Olá,</UserGretting>
                            <UserName>Rodrigo</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard 
                title='Entrada'
                amount='R$ 17.400,00' 
                lastTransation='Última entrada dia 13 de abril'
                type='up'/>

                <HighlightCard 
                title='Saída' 
                amount='R$ 1.290,00' 
                lastTransation='Última saída dia 03 de abril'
                type='down'/>

                <HighlightCard
                title='Total' 
                amount='R$ 16.141,00' 
                lastTransation='01 á 16 de abril'
                type='total'/>
            </HighlightCards>

            <Trasations>
               <Title>Listagem</Title> 

               <TransationCard data={data}/>
            </Trasations>

        </Container>
    )
}