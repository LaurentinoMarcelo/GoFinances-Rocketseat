import React, { useCallback, useEffect, useState } from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransationCard, TransationCardProps } from '../../components/TransationCard';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

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
   const [data, setData] = useState<DataListProps[]>([]);

   async function loadTransactions(){
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    

    
    const transactionsFormated: DataListProps[] = transactions
    .map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
            style:'currency',
            currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(item.date));

        return{
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
        }
    });

    setData(transactionsFormated);
   }

   useEffect(() => {
    loadTransactions();
    /*const datakey = '@gofinances:transactions';
    AsyncStorage.removeItem(datakey);*/
   },[])

   useFocusEffect(useCallback(() => {
    loadTransactions();
   },[]));

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