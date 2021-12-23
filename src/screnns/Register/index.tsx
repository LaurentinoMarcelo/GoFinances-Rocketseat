import React from "react";
import { Input } from "../../components/Forms/input";
import { Button } from "../../components/Forms/Button";
import { TransationTypeButton } from "../../components/Forms/TransationTypeButton";
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
} from "./styles";

export function Register(){
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

                <TransationTypeButton
                    type="up"
                    title="Income"
                />

            </Fields>

            <Button title="Enviar"/>
        </Form>
            
            
        </Container>

        ) 
}