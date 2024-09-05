import { Button, Container } from "@medusajs/ui";
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input as SimpleInput } from './Input';
import { slugs, questions } from '../data/questions';
import { writePersonalData } from "../lib/firebase";
import { useStore } from "../lib/z-store";
import { z, ZodType } from "zod"; // Add new import
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
    [key: string]: string;
};

const temp: Record<string, ZodType<string>> = {};

slugs.forEach(slug => {
    temp[slug] = z.string().min(3);
})

const schema = z.object(temp)

function clear() {
    console.log('clear');
}

function reset() {
    console.log('reset');
}

export const Form = () => {
    const navigate = useNavigate();

    const { email } = useStore(state => state)

    const {
        register,
        handleSubmit,
        // watch,
        // setError,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema)
    });

    const onSubmitRHF: SubmitHandler<Inputs> = data => {
        writePersonalData(data, email)
            .then(docRef => {
                navigate(`/thoughts/${docRef!.id}`)
            });
    };


    const growHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target
        el.style.height = el.scrollHeight + 'px'
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmitRHF)} className="mx-auto w-fit">
                {
                    slugs.map((slug, i) => (
                        <SimpleInput
                            key={slug}
                            label={questions[i]}
                            register={register(slug, { onChange: growHeight })}
                            error={errors[slug]}
                        />
                    ))
                }

                <br />

                <div className='flex gap-4'>
                    <Button type="submit">Submit</Button>
                    <button type="button" onClick={clear}>Clear</button>

                    <Button variant="secondary" onClick={reset}>Reset</Button>
                </div>
            </form>
        </Container>
    );
};
