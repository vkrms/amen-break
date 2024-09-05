import { Heading, Input, Button, Label, Tabs } from "@medusajs/ui"
import { doMagic } from '../lib/google-auth'
import { signIn, signUp } from "../lib/firebase"
import { useRowCount, useStore } from "../lib/z-store"
import { GoogleButton } from "./google_button"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import type {NavigateFunction} from "react-router-dom"

interface FormEventParams {
    e: React.FormEvent<HTMLFormElement>
    navigate: NavigateFunction,
}

interface FormHandlerParams extends FormEventParams {
    action: (email: string, password: string) => Promise<any>
}

function handleForm({ e, navigate, action}: FormHandlerParams) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataObject = Object.fromEntries(formData.entries())
    const { email, password } = formDataObject

    action(email, password)
        .then(user => {
            console.log({user})
            navigate('/thoughts')
        })
}

function handleSignUpForm({e, navigate}: FormEventParams) {
    handleForm({ e, navigate, action: signUp})
}

function handleSignInForm({e, navigate}: FormEventParams) {
    handleForm({e, navigate, action: signIn})
}

const { doAuth } = useStore.getState()

export const Login: React.FC = () => {
    const [signin, setSignin] = useState(true)

    function toggle() {
        setSignin(!signin)
    }

    const navigate = useNavigate()

    return (
        <div className="w-80 text-left">
            <Tabs defaultValue="signin">
                <Tabs.Content value="signup">
                    <Heading level='h2' className="mb-4">Sign Up</Heading>

                    <form onSubmit={(e) => handleSignUpForm({e, navigate, doAuth})}>
                        <Label className="control-group">
                            <div>Email</div>
                            <Input type="email" name="email"/>
                        </Label>

                        <Label className="control-group">
                            <div>Password</div>
                            <Input type="password" name="password"/>    
                        </Label>

                        <Button type="submit">Sign up</Button>
                    </form>
                </Tabs.Content>

                <Tabs.Content value="signin">
                    <Heading level='h2' className="mb-4">Sign In</Heading>
                    
                    <form onSubmit={(e) => handleSignInForm({e, navigate, doAuth})}>
                        <Label className="control-group">
                            <div>Email</div>
                            <Input type="email" name="email" />
                        </Label>

                        <Label className="control-group">
                            <div>Password</div>
                            <Input type="password" name="password" />
                        </Label>

                        <Button type="submit">Sign in</Button>
                    </form>                    
                </Tabs.Content>

                <Tabs.List>
                    {
                        signin &&
                        <div className="mt-4 mb-2">
                            You would probably like to <Tabs.Trigger value="signup" onClick={toggle}>Sign Up</Tabs.Trigger> if you have not already, or
                        </div>
                    }

                    {
                        !signin &&
                        <Tabs.Trigger value="signin" onClick={toggle}>Sign In</Tabs.Trigger>
                    }
                                    
                </Tabs.List>
            </Tabs>


            {/* <Button onClick={doMagic}>sign in with google</Button> */}

            <GoogleButton onClick={() => doMagic(doAuth)} />

            {/*
                <form>
                    <Input label="Username" />
                    <Input label="Password" type="password" />
                </form>
            */}

            {/* <div>
                <BearCounter />
                <BearControl />
            </div> */}

        </div>
    )

}

const BearCounter: React.FC = () => {
    const bears = useStore(state => state.bears)
    return <h1>{bears} around here...</h1>
}

const BearControl: React.FC = () => {
    // const increasePopulation = useStore(state => state.increasePopulation)
    const { email, increasePopulation, isAuthenticated, setEmail } = useStore(state => state)
    const rowCount = useRowCount()
    return (
        <>
            <button onClick={increasePopulation}>one up {rowCount}</button>
            <br/>
            email is: {email}
            <br/>
            {isAuthenticated() ? 'logged in' : 'not logged in'}
            <br/>
            <Button onClick={() => setEmail('a@b.co')}>set email: a@b.co</Button>
        </>
    )
}    