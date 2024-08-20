import { Container, Heading, Input } from "@medusajs/ui"

export const Login: React.FC = () => {
    return (
        <Container>
            <Heading>Login</Heading>
            <form>
                <Input label="Username" />
                <Input label="Password" type="password" />
            </form>
        </Container>
    )

}
