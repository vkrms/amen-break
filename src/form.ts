import { autorun } from "mobx";
import MobxReactForm from "mobx-react-form";
// import dvr from "mobx-react-form/lib/validators/DVR";
// import validatorjs from "validatorjs";

const plugins = {
    // dvr: dvr({ package: validatorjs }),
};

import { slugs, questions } from "./data/questions";
import { writePersonalData } from "./lib/firebase";
import { store } from "./lib/store";

const fields = [
    // {
    //     name: "email",
    //     label: "Email",
    //     placeholder: "Insert Email",
    //     // rules: "required|email|string|between:5,25",
    //     value: "s.jobs@apple.com",
    // },
    // {
    //     name: "password",
    //     label: "Password",
    //     placeholder: "Insert Password",
    //     // rules: "required|string|between:5,25",
    //     type: "password",
    //     options: {
    //         autoTrimValue: true,
    //     },
    // },
    // {
    //     name: "passwordConfirm",
    //     label: "Password Confirmation",
    //     placeholder: "Confirm Password",
    //     // rules: "required|string|same:password",
    //     type: "password",
    //     options: {
    //         autoTrimValue: true,
    //     },
    // },
];

slugs.forEach((slug, i) => {
    fields.push({
        name: slug,
        label: questions[i],
        placeholder: slug,
        type: "text",
    });
});

const hooks = {
    onInit(form) {
        autorun(() => form.clearing && console.log("Clearing..."));
        autorun(() => form.resetting && console.log("Resetting..."));
        autorun(() => form.validating && console.log("Validating..."));
        autorun(() => form.submitting && console.log("Submitting..."));
    },
    onSuccess(form) {
        alert("todo: run actual valiation here");
        // get field values
        console.log("Form Values!", form.values());

        writePersonalData(form.values(), store.email!);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    },
};

export default new MobxReactForm(
    { fields },
    {
        plugins,
        hooks,
    }
);
