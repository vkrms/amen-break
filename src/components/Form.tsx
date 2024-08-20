import { observer } from 'mobx-react';
import { Input as SimpleInput } from './Input';
import { slugs } from '../data/questions';

import { Button, Container } from "@medusajs/ui";


export default observer(({ form }) => (
    <Container>
        <form onSubmit={form.onSubmit} className="mx-auto w-fit">
            {
                slugs.map((slug, i) => (
                    <SimpleInput key={slug} field={form.$(slug)} />
                ))
            }

            <br />

            <div className='flex gap-4'>
                <Button type="submit" onClick={form.onSubmit}>Submit</Button>
                <button type="button" onClick={form.onClear}>Clear</button>

                <Button variant="secondary" onClick={form.onReset}>Reset</Button>
            </div>

            <p>{form.error}</p>
        </form>
    </Container>
));
