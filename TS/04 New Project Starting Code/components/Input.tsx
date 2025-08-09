import {type ComponentPropsWithoutRef, forwardRef, type Ref} from "react";

type InputProps = {
    id: string;
    label: string;
} & ComponentPropsWithoutRef<'input'>;

const inputFn = function Input(
    {id, label, ...props}: InputProps, ref: Ref<HTMLInputElement>
) {
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} ref={ref}/>
        </p>
    );
}

export default forwardRef<HTMLInputElement, InputProps>(inputFn);