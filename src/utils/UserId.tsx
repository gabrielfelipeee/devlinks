import { jwtDecode } from "jwt-decode";
import { IToken } from "../interfaces/IToken";

const token = sessionStorage.getItem("token");
export const userIdAuthenticated = token ? jwtDecode<IToken>(token).nameid : null;

