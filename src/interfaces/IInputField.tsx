import { UseFormRegister } from 'react-hook-form';
import { IFormData } from './IFormData';

export default interface IInputField {
    type?: string,
    placeholder?: string,
    name: keyof IFormData,
    register: UseFormRegister<IFormData>,
    error?: boolean,
    errorMessage?: string
}
