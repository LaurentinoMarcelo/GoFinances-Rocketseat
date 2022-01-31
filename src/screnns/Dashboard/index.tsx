import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

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
  LoadContainer,
  LogoutButton,
} from "./styles";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: string;
  lastTransaction: string;
  typeTotalTransaction?: "positive" | "negative" | "zero";
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFiltered = transactions.filter(
      (transactions) => transactions.type === type
    );

    const todayDateYear = new Date().getFullYear();

    const dataArray = collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime());

    const lastTransaction = new Date(Math.max.apply(Math, dataArray));

    const lastTransactionYear = lastTransaction.getFullYear();

    return dataArray.length === 0
      ? ""
      : `${
          type === "positive" ? "Última entrada dia " : "Última saída dia "
        } ${lastTransaction.getDate()} de ${
          todayDateYear === lastTransactionYear
            ? lastTransaction.toLocaleString("pt-BR", { month: "long" })
            : lastTransaction.toLocaleString("pt-BR", { month: "short" }) +
              " de " +
              lastTransactionYear
        }`;
  }

  function getTotalIntervalTransactionDate(collection: DataListProps[]) {
    const dateArray = collection.map((transaction) =>
      new Date(transaction.date).getTime()
    );

    const lastTransaction = new Date(Math.max.apply(Math, dateArray));

    const lastTransactionFormmated = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(lastTransaction);

    const firstTransaction = new Date(Math.min.apply(Math, dateArray));

    const firstTransactionFormmated = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(firstTransaction);

    const firstTransactionYear = firstTransaction.getFullYear();
    const lastTransactionYear = lastTransaction.getFullYear();

    return firstTransactionYear === lastTransactionYear
      ? `${firstTransactionFormmated} ~ ${lastTransactionFormmated}`
      : `${firstTransactionFormmated}. ${firstTransactionYear} ~ ${lastTransactionFormmated}. ${lastTransactionYear}`;
  }
  function convertToReal(value: number) {
    const string = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return string.replace("R$", "R$ ");
  }

  function totalTransactionsType(value: number) {
    if (value < 0) {
      return "negative";
    } else if (value === 0) {
      return "zero";
    } else {
      return "positive";
    }
  }

  async function loadTransactions() {
    const datakey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        let amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormated);

    const lengthArray = transactions.length;

    const lastTransactionEntries =
      lengthArray === 0 ? "" : getLastTransactionDate(transactions, "positive");
    const lastTransactionExpensives =
      lengthArray === 0 ? "" : getLastTransactionDate(transactions, "negative");
    const totalInterval =
      lengthArray === 0 ? "" : getTotalIntervalTransactionDate(transactions);

    let total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        amount: convertToReal(entriesTotal),
        lastTransaction: lastTransactionEntries,
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        amount: convertToReal(expensiveTotal),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        total: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        amount: convertToReal(total),
        lastTransaction: totalInterval,
        typeTotalTransaction: totalTransactionsType(total),
      },
      /*entries: {
            total: entriesTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            }),
            lastTransaction: lastTransactionEntries === 0
            ? 'Não há transações' 
            : `Última entrada dia ${lastTransactionEntries}`,
        },
        expensives: {
            total: expensiveTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            }),
            lastTransaction: lastTransactionEntries === 0
            ? 'Não há transações' 
            : `Última entrada dia ${lastTransactionEntries}`,
            
        },
        total: {
            total: total.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL',
            }),
            lastTransaction: totalInterval
        }*/
    });

    setLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }}></Photo>
                <User>
                  <UserGretting>Olá,</UserGretting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entrada"
              amount={highlightData.entries.total}
              lastTransation={highlightData.entries.lastTransaction}
              type="up"
            />

            <HighlightCard
              title="Saída"
              amount={highlightData.expensives.total}
              lastTransation={highlightData.expensives.lastTransaction}
              type="down"
            />

            <HighlightCard
              title="Total"
              amount={highlightData.total.total}
              lastTransation={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
