import { Label, Textarea } from "@medusajs/ui";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
    register: UseFormRegisterReturn<string>;
    label: string;
    error?: FieldError;
}

export const Input: React.FC<Props> = ({register, label, error}) => (
    <div className="measure mb-6">
        <Label className="block mb-2">
            {label}
        </Label>

        <Textarea {...register} className={'input'} />   

        {error && <small className={'text-ui-fg-error'}>{error.message}</small>}
    </div>
)
