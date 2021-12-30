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

interface HighlightProps {
    total: string;
}

interface HighlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
   const [transactions, setTransactions] = useState<DataListProps[]>([]);
   const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

   async function loadTransactions(){
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    
    const transactionsFormated: DataListProps[] = transactions
    .map((item: DataListProps) => {

        if(item.type === 'positive'){
            entriesTotal += Number(item.amount);
        }else{
            expensiveTotal += Number(item.amount);
        }


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

    setTransactions(transactionsFormated);

    let total = entriesTotal - expensiveTotal;

    setHighlightData({
        entries: {
            total: entriesTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })
        },
        expensives: {
            total: expensiveTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })
            
        },
        total: {
            total: total.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })
        }
    });
   }

   useEffect(() => {
    loadTransactions();
    /*const datakey = '@gofinances:transactions';
    AsyncStorage.removeItem(datakey);*/
   },[])

   useFocusEffect(useCallback(() => {
    loadTransactions();
   },[]));

   console.log(highlightData.entries.total,highlightData.expensives.total, highlightData.total.total);
   
   
   
   
   
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
                amount={highlightData.entries.total}
                lastTransation='Última entrada dia 13 de abril'
                type='up'/>

                <HighlightCard 
                title='Saída' 
                amount={highlightData.expensives.total} 
                lastTransation='Última saída dia 03 de abril'
                type='down'/>

                <HighlightCard
                title='Total' 
                amount={highlightData.total.total} 
                lastTransation='01 á 16 de abril'
                type='total'/>
            </HighlightCards>

            <Transactions>
               <Title>Listagem</Title> 

            <TransactionList
                data = {transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransationCard data={item}/>} 
            />

               
            </Transactions>

        </Container>
    )
}