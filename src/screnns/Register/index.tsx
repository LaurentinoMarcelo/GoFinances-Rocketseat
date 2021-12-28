import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Forms/input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransationTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect"

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";


export function Register(){
   
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleTransactionTypeButton(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }

    return(
    
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

        <Form>
            <Fields>
                <Input
                placeholder="nome"
                />

                <Input
                placeholder="preço"
                />

                <TransactionsTypes>
                    <TransactionTypeButton
                        type="up"
                        title="Income"
                        onPress={() => handleTransactionTypeButton('up')}
                        isActive={transactionType === 'up'}
                        /> 

                    <TransactionTypeButton
                        type="down"
                        title="Outcome"
                        onPress={() => handleTransactionTypeButton('down')}
                        isActive={transactionType === 'down'}
                        />  
                </TransactionsTypes>
                
                <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
                />
            </Fields>

            

            <Button title="Enviar"/>
        </Form>

        <Modal visible={categoryModalOpen}>
            <CategorySelect
            category= {category}
            setCategory= {setCategory}
            closeSelectCategory= {handleCloseSelectCategoryModal}
            />
        </Modal>    
            
        </Container>

        ) 
}