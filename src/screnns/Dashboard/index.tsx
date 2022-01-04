import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

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
    TransactionList,
    LoadContainer
} from './styles'
import { useTheme } from 'styled-components';

export interface DataListProps extends TransationCardProps{
    id: String;
}

interface HighlightProps {
    total: string;
    lastTransaction: string;
}

interface HighlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
   const [isLoading, setLoading] = useState(true);
   const [transactions, setTransactions] = useState<DataListProps[]>([]);
   const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

   const theme = useTheme();

   function getLastTransactionDate(
       collection: DataListProps[], 
       type: 'positive' | 'negative'
       ){
    const lastTransaction = new Date(
    Math.max.apply(Math, transactions
    .filter(transactions => transactions.type === 'positive')
    .map(transactions => new Date(transactions.date).getTime())))
    
   return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month : 'long'})} `;
   }

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

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    let total = entriesTotal - expensiveTotal;

    setHighlightData({
        entries: {
            total: entriesTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            }),
            lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
        },
        expensives: {
            total: expensiveTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            }),
            lastTransaction: `Última entrada dia ${lastTransactionExpensives}`,
            
        },
        total: {
            total: total.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL',
            }),
            lastTransaction: totalInterval
        }
    });

    setLoading(false);
   }

   useEffect(() => {
    loadTransactions();
   },[])

   useFocusEffect(useCallback(() => {
    loadTransactions();
   },[]));

    return(
        <Container>
            {
            isLoading ? 
            <LoadContainer>
                <ActivityIndicator 
                    color={theme.colors.primary}
                    size="large" 
                />
            </LoadContainer> :
            <>
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
                    lastTransation={highlightData.entries.lastTransaction}
                    type='up'/>

                    <HighlightCard 
                    title='Saída' 
                    amount={highlightData.expensives.total} 
                    lastTransation={highlightData.expensives.lastTransaction}
                    type='down'/>

                    <HighlightCard
                    title='Total' 
                    amount={highlightData.total.total} 
                    lastTransation={highlightData.total.lastTransaction}
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
            </>
            }
        </Container>
    )
}