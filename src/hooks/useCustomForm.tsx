import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';



// T extends FieldValues: T é um tipo genérico que deve ser um subtipo de FieldValues (ou seja, um objeto que representa os dados de um formulário).
interface UseCustomFormProps<T extends FieldValues> {
    schema: ZodType<T, any, any>; // ZodType é um esquema de validação do zod
    mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'all'; // Configuração do modo de validação
}


// UseFormReturn<T>: A função retorna um valor do tipo UseFormReturn<T>, que é o retorno do hook useForm tipado para o tipo T.
export function useCustomForm<T extends FieldValues>({
    schema,
    mode = 'onBlur'
}: UseCustomFormProps<T>): UseFormReturn<T> {
    return useForm<T>({
        resolver: zodResolver(schema),
        mode
    });
}
