import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HsitoryCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./style";

import { useTheme } from "styled-components";

import { RFValue } from "react-native-responsive-fontsize";

import { VictoryPie } from "victory-native";

import { categories } from "../../utils/categories";

import { addMonths, subMonths, format } from "date-fns";

import { ptBR } from "date-fns/locale";

import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, settotalByCategories] = useState<CategoryData[]>(
    []
  );

  const { user } = useAuth();
  const theme = useTheme();

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      const newData = addMonths(selectedDate, 1);
      setSelectedDate(newData);
    } else {
      const newData = subMonths(selectedDate, 1);
      setSelectedDate(newData);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const datakey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(datakey);
    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormated = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormated,
          color: category.color,
          percent,
        });
      }
    });
    settotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <TouchableOpacity onPress={() => handleChangeDate("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </TouchableOpacity>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <TouchableOpacity onPress={() => handleChangeDate("next")}>
              <MonthSelectIcon name="chevron-right" />
            </TouchableOpacity>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormated}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
