import { useEffect, useState } from 'react';
import { InputInert } from './InputInert';
import { useParams } from 'react-router-dom';
import { fetchPersonalThought } from '../lib/firebase';
import { Container } from "@medusajs/ui";
import { slugs, questions } from '../data/questions';
import { useStore } from '../lib/z-store';

export const SingleThought: React.FC = () => {
    const [fields, setFields] = useState([]);
    const { id } = useParams();

    const { email } = useStore.getState();

    useEffect(() => {
        // fetch fields from firebase
        fetchPersonalThought(id, email)
            .then((thought) => {
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
        </Container>
    )
}