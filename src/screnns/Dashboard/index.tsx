import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransationCard, TransationCardProps } from '../../components/TransationCard';

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
    Transactions,
    Title,
    TransactionList
} from './styles'

export interface DataListProps extends TransationCardProps{
    id: String;
}

export function Dashboard(){
    const data = [
        {   
            id: '1',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: { 
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/06/2021'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            category: { 
                name: 'Alimentação',
                icon: 'coffee'
            },
            date: '10/04/2021'
        },
        {
            id: '3',
            type: 'negative',
            title: 'Aluguel do apartamento',
            amount: 'R$ 1.200,00',
            category: { 
                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: '05/11/2021'
        }
];

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

            <Transactions>
               <Title>Listagem</Title> 

            <TransactionList
                data = {data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransationCard data={item}/>} 
            />

               
            </Transactions>

        </Container>
    )
}