import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from './services/modelo/modelo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  modeloForm: FormGroup = new FormGroup({});
  message: string = '';
  response: any = null;

  constructor (
    public fb: FormBuilder,
    public modeloService: ModeloService, 
    private http: HttpClient,
  ){

  }
  title = 'frontModel';
  ngOnInit(): void {
    this.modeloForm = this.fb.group({
      message : ['', Validators.required],
      response : ['', Validators.required],
    });
  }

  enviar() {
    const url = 'http://161.35.97.105:9802/comment';
    const body = { content: this.message };

    console.log("eviando", body);
    this.http.post(url, body).subscribe(
      (res) => {
        this.response = res;
        // Aquí puedes realizar cualquier acción adicional con la respuesta
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
        // Aquí puedes manejar el error si ocurre alguno
      }
    );

  }
}
