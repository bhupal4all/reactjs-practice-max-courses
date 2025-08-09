import {type ComponentPropsWithoutRef, type FormEvent, forwardRef, Ref, useImperativeHandle, useRef} from "react";

type FormProps = ComponentPropsWithoutRef<'form'> & {
    onSave: (data: unknown) => void;
};

export type FormHandle = {
    clear: () => void;
    getData: () => unknown;
}

const formFn = function Form(
    {onSave, ...otherProps}: FormProps,
    ref: Ref<FormHandle>
) {
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
        return {
            clear: (): void => {
                formRef.current?.reset();
            },
            getData: (): unknown => {
                if (!formRef.current) {
                    return undefined;
                }
                const formData = new FormData(formRef.current);
                return Object.fromEntries(formData);
            }
        }
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        onSave(data);
    }

    return (
        <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
            {otherProps.children}
        </form>
    );
}

export default forwardRef<FormHandle, FormProps>(formFn);