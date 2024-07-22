import { useForm } from "react-hook-form"
import { IFormData } from "../interfaces/IFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import useFormSchema from "./useFormSchema"

const useCard = () => {
    const { cardFormSchema } = useFormSchema();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IFormData>({
        resolver: zodResolver(cardFormSchema)
    })

    const onSubmit = (data: IFormData) => {
        console.log(data)
        console.log(errors)
        console.log("tewste")
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors
    }
}
export default useCard;
