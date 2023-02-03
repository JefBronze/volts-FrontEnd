import { Center, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }){
    return (
        <Center bg='tomato' h='500px' color='white'>
            <Container maxW='2xl' bg='blue.600' centerContent>
                {children}
            </Container>
        </Center>
    )
}