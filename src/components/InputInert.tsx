import { Label, Textarea } from "@medusajs/ui";
import { useState, useRef, useEffect } from "react";

interface Props {
    label: string;
    value: string;
}

export const InputInert = ({ label, value }: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null)    
    const [height, setHeight] = useState<string>('auto');

    useEffect(() => {
        setHeight(`${ref.current?.scrollHeight ?? '-1'}px`);
    },[value])
    
    return (
        <div className="measure mb-6">
            <Label className="block mb-2">
                {label}
            </Label>

            <Textarea value={value} className={'input'} readOnly style={{height}} ref={ref} />
        </div>
)};
