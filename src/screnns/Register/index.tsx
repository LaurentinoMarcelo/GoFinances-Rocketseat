import React from "react";
import { Input } from "../../components/Forms/input";
import { 
    Container,
    Header,
    Title,
    Form,
} from "./styles";

export function Register(){
    return(
    
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

        <Form>
             <Input
            placeholder="nome"
            />

             <Input
            placeholder="preço"
            />
        </Form>
           
            
        </Container>

        ) 
}