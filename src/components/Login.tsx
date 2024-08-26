import { Container, Heading, Input, Button, Text, Label, Tabs } from "@medusajs/ui"
import { doMagic } from '../lib/google-auth'
import { signIn, signUp } from "../lib/firebase"

function handleSignUpForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataObject = Object.fromEntries(formData.entries())
    const { email, password } = formDataObject
    console.log('signing up', email, password)

    // @ts-expect-error: all fine
    signUp(email, password).then(user => console.log(user))
}

function handleSignInForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataObject = Object.fromEntries(formData.entries())
    const { email, password } = formDataObject
    console.log('signing up', email, password)

    // @ts-expect-error: all fine
    signIn(email, password).then(user => console.log(user))
}

export const Login: React.FC = () => {
    return (
        <Container className="w-96">
            {/* <Heading>Login</Heading> */}

            {/* <Text>
                Lorem ipsum dolor sit amet
            </Text> */}

            <Tabs defaultValue="signup">
                <Tabs.List>
                    <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
                    <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="signup">
                    <Heading level='h3'>Sign Up</Heading>
                    <form onSubmit={handleSignUpForm}>
                        <Label>
                            <div>Email</div>
                            <Input type="email" name="email"/>
                        </Label>

                        <Label>
                            <div>Password</div>
                            <Input type="password" name="password"/>    
                        </Label>

                        <Button type="submit">Sign up</Button>
                    </form>
                </Tabs.Content>

                <Tabs.Content value="signin">
                    <Heading level='h3'>Sign In</Heading>
                    <form onSubmit={handleSignInForm}>
                        <Label>
                            <div>Email</div>
                            <Input type="email" name="email" />
                        </Label>

                        <Label>
                            <div>Password</div>
                            <Input type="password" name="password" />
                        </Label>

                        <Button type="submit">Sign in</Button>
                    </form>                    
                </Tabs.Content>
            </Tabs>



            <Button onClick={doMagic}>sign in with google</Button>
            {/* <form>
                <Input label="Username" />
                <Input label="Password" type="password" />
            </form> */}
        </Container>
    )

}
