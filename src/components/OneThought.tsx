import { useEffect, useState } from 'react';
import { InputInert } from './InputInert';
import { useParams } from 'react-router-dom';
import { fetchThought } from '../lib/firebase';
import { Container } from "@medusajs/ui";
import { slugs, questions } from '../data/questions';

export const OneThought: React.FC = () => {
    const [fields, setFields] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // fetch fields from firebase
        fetchThought(id).then((thought) => {
            console.log(thought);
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