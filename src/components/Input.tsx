import { observer } from "mobx-react";
import { Label, Textarea } from "@medusajs/ui";

// const handleOnChange = field => (e) => {
//     // very simplified, the package already do this automatically
//     field.set(e.target.value);
// }

const handleOnChange = field => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('1')
    const el = e.target
    field.set(el.value);
    el.style.height = el.scrollHeight + 'px'
}

export const Input = observer(({ field }) => (
    <div className="measure mb-6">
        <Label className="block mb-2">
            {field.label}
        </Label>

        <Textarea {...field.bind({onChange: handleOnChange(field)})} className={'input'}/>   

        <small className={'$small'}>{field.error}</small>
    </div>
));
