import { Controller } from 'react-hook-form';
import { InputField, InputFieldPassword } from './components';

interface InputControllerFieldProps {
    name: string,
    control: any,
    defaultValue?: string,
    shouldUnregister?: boolean,

    placeholder?: string,
    errors: any,
    customErrorMessage?: string,
    isPasswordField?: boolean,
};

export const InputControllerField = ({
    name,
    control,
    defaultValue = "",
    shouldUnregister = false,
    isPasswordField = false,
    errors,
    customErrorMessage,
    placeholder = name
}: InputControllerFieldProps) => {
    const FieldComponent = isPasswordField ? InputFieldPassword : InputField;

    return (
        <Controller
            name={name} // Nome do campo que será associado ao formulário
            control={control} // Objeto de controle do RHF que gerencia o estado do formulário
            defaultValue={defaultValue} // Valor inicial do campo, usado para inicializar o valor
            shouldUnregister={shouldUnregister} // Define que o campo não será removido do estado do formulário quando for desmontado
            render={({ field }) => (
                <FieldComponent
                    placeholder={placeholder}
                    field={field} // As props 'field' incluem value, onChange, onBlur, e outras necessárias para o RHF controlar o campo
                    error={!!errors?.[name] || !!customErrorMessage}
                    errorMessage={errors?.[name]?.message || customErrorMessage}
                />
            )}
        >
        </Controller >
    )
};
