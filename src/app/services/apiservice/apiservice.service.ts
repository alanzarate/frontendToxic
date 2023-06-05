import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponseCurrencyDto } from 'src/app/dto/response.api.dto';
import { ResponseDataCorrect } from 'src/app/dto/dataResponseCorrect.dto';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  public getDataFromApi(message: string):
    Observable<ResponseCurrencyDto<ResponseDataCorrect>>{
      const body = { content: message}
      return this.http.post<any>('http://161.35.97.105:9802/comment', body)
  }
}
