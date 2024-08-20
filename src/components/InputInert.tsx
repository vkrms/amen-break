import { Label, Textarea } from "@medusajs/ui";
import { store } from "../lib/store";
import { observer } from "mobx-react";

export const InputInert: React.FC = observer(({ label, value }) => (
    <div className="measure mb-6">
        <Label className="block mb-2">
            {store.whatever + '___' + label}
        </Label>

        <Textarea value={value} className={'input'} readOnly/>
    </div>
));
