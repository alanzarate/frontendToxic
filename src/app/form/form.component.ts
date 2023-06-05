import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  message: string = '';
  response: any = null;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const url = 'http://161.35.97.105:9802/comment';
    const body = { content: this.message };
    console.log('Enviando solicitud:', body);

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

}
