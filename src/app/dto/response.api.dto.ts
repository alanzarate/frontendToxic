import { ResponseDataCorrect } from "./dataResponseCorrect.dto";

export interface ResponseCurrencyDto<T>{
    data: T,
    message: string,
    success: boolean
}