import { useEffect, useState } from 'react';
import { InputInert } from './InputInert';
import { useNavigate, useParams } from 'react-router-dom';
import { removeDoc, fetchPersonalThought } from '../lib/firebase';
import { Container, Prompt, Button } from "@medusajs/ui";
import { slugs, questions } from '../data/questions';
import { useStore } from '../lib/z-store';



export const SingleThought: React.FC = () => {
    const [fields, setFields] = useState<{ [key: string]: string }>({});
    const { id } = useParams();
    const { email } = useStore.getState();

    const navigate = useNavigate();

    function remove() {
        if (!id || !email) return;
        removeDoc(id, email).then(() => {
            navigate("/thoughts");
        })
    }

    useEffect(() => {
        if (!id || !email) return

        // fetch fields from firebase
        fetchPersonalThought(id, email)
            .then((thought) => {
                if (thought)
                    setFields(thought);
            });
    }, [])

    return (
        <Container className="w-fit mx-auto">
            <div>
                {
                    slugs.map((slug, i) => (
                        <InputInert key={slug} label={questions[i]} value={fields[slug]}/>
                    ))
                }        
            </div>

            <Prompt>
                <Prompt.Trigger asChild>
                    <Button>Delete</Button>
                </Prompt.Trigger>
                <Prompt.Content>
                    <Prompt.Header>
                        <Prompt.Title>Delete something</Prompt.Title>
                        <Prompt.Description>
                            Are you sure? This cannot be undone.
                        </Prompt.Description>
                    </Prompt.Header>
                    <Prompt.Footer>
                        <Prompt.Cancel>Cancel</Prompt.Cancel>
                        <Prompt.Action onClick={remove}>Delete</Prompt.Action>
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>

        </Container>
    )
}