import { Button, Heading, Text } from "@medusajs/ui"
import { Link } from "react-router-dom"

export const About = () => {
    return (
        <article>
            <Heading>About</Heading>
            <Text>
                It's an exercise in cognitive behavioral therapy and also in React, TypeScript and Firebase. I was going to add encryption with Google Cloud KMS so people could submit thoughts without me being able to ever read them, But for now I'm prioritizing just rolling it out first. Not that I expect anyone but me using it anyway.
                
                This is inspired by something Dr. Amen said. He calls it "squishing ANTs", meaning Automatic Negative Thoughts, and supposedly writing down around 30 of them should give you some small but noticeable mental relief.

                I've been in CBT a bunch of times and I've always struggled with filling those printed-out excel spreadsheets, I don't think I've ever managed to get even 15 of them written down. So I'm hoping this will help me and others like me.
            </Text>
            
            <Link to="/login">
                <Button>Get Started</Button>
            </Link>
        </article>
    )
}