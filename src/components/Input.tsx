import { Label, Textarea } from "@medusajs/ui";

export const Input = ({register, label, error}) => (
    <div className="measure mb-6">
        <Label className="block mb-2">
            {label}
        </Label>

        <Textarea {...register} className={'input'} />   

        {error && <small className={'text-ui-fg-error'}>{error.message}</small>}
    </div>
)
