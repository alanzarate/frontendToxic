import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { ResponseCurrencyDto } from '../dto/response.api.dto';
import { ResponseDataCorrect } from '../dto/dataResponseCorrect.dto';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  message: string = '';
  response: any = null;
  forFront = {
    obscene: 0,
    insult:0,
    threat:0,
    severe_toxic:0,
    toxic:0,
    hate:0

  }
  formData: FormGroup;
  responseCurrencyDto: ResponseCurrencyDto<ResponseDataCorrect>;

  constructor(private fba: FormBuilder, private apiService: ApiserviceService) {
    this.formData = this.fba.group(
      {
        message_1:''
      }
    )
  }

  submit(){
    console.log(this.formData.value);
    this.apiService.getDataFromApi(
      this.formData.value.message_1
    ).subscribe({
      next: (data) => {
        
        this.responseCurrencyDto = data;
        console.log(this.responseCurrencyDto)
        this.updateVals();
      },
      error: (error) => console.log("ERROR >>>>>>>>> ", error)
    })
  }
  updateVals(){
    this.forFront.hate = this.responseCurrencyDto.data.score.identity_hate * 100.;
    this.forFront.toxic = this.responseCurrencyDto.data.score.toxicity * 100 ;
    this.forFront.severe_toxic = this.responseCurrencyDto.data.score.severe_toxic * 100;
    this.forFront.insult = this.responseCurrencyDto.data.score.insult * 100;
    this.forFront.threat = this.responseCurrencyDto.data.score.threat * 100;
    this.forFront.obscene = this.responseCurrencyDto.data.score.obscene * 100;
  }

  /*
  onSubmit(): void {
    const url = 'http://161.35.97.105:9802/comment';
    const body = { content: this.message };
    console.log('Enviando solicitud:', body);
    console.log(url);

    this.http.post(url, body).subscribe(
      (res) => {
        this.response = res;
        console.log('Respuesta del servidor:', this.response);
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
      }
    );
  }
  */

}
