import React, { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HsitoryCard';
import {
    Container,
    Header,
    Title,
    Content
} from "./style"

import { categories } from '../../utils/categories'

interface TransationData{
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
} 

interface CategoryData{
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume(){
    const [totalByCategories, settotalByCategories] = useState<CategoryData[]>([]);
    
    async function loadData(){
        const datakey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(datakey);
        const responseFormated = response ? JSON.parse(response) : [];       
        
        const expensives = responseFormated
        .filter((expensive : TransationData) => expensive.type === 'negative');
        console.log(expensives);
        
        /*const totalByCategory: CategoryData[] = [];

        categories.forEach(category  => {
            let categorySum = 0;

            expensives.array.forEach((expensive : TransationData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
                });

                if (categorySum > 0) {
                    const total = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                        totalByCategory.push({
                        key: category.key,
                        name: category.name,
                        total,
                        color:category.color,
                    });         
                }
        });
        settotalByCategories(totalByCategory);*/
    }

    useEffect(() => {
        loadData();
    },[])

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
            {
                totalByCategories.map(item => (
                    <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.total}
                    color={item.color}
                />
                ))
            } 
            </Content>

        </Container>
    )
}
