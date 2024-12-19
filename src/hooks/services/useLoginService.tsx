import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/IToken';
import { ILoginErrorResponse, ILoginSuccessResponse, } from '../../interfaces';
import { loginService } from '../../services';


export const useLoginService = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const loginMutation = useMutation(loginService.postLogin, {
        onSuccess: (data) => {

            var response = data as ILoginSuccessResponse;
            if (response.authenticated && response.acessToken) {
                sessionStorage.setItem("token", response.acessToken);
                const decodedToken = jwtDecode<IToken>(response.acessToken);
                sessionStorage.setItem("userIdAuthenticated", decodedToken.nameid);

                queryClient.refetchQueries('user-authenticated');
                queryClient.invalidateQueries(['all-links']);


                navigate('/');
            }
        }
    });

    return {
        login: loginMutation.mutate,
        errorLogin: loginMutation.error as ILoginErrorResponse,
        isErrorLogin: loginMutation.isError,
        isLoadingLogin: loginMutation.isLoading
    };
};
