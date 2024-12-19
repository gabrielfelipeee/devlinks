import { ControllerRenderProps } from 'react-hook-form';

export interface IInputField  {
    type?: string,
    placeholder?: string,
    field: ControllerRenderProps<any, string>,
    errorMessage?: string,
    error?: boolean
}
