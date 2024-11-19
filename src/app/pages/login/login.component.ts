import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  


  // Propiedades para almacenar los datos del formulario
  usuario: string = '';
  contrasena: string = '';

  

  constructor(private router: Router, private authService: AuthService) {}
 
  // Método para manejar el envío del formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido');
      console.log('Usuario:', this.usuario);
      console.log('Valores del formulario:', form.value);
      // aca logeo

      this.authService.login(this.usuario, this.contrasena).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.usuario.rol === 'organizador') {
          this.router.navigate(['/managerevents']);
          }else{
            this.router.navigate(['/register']);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(form.controls).forEach((key) => {
        const control = form.controls[key];
        control.markAsTouched();
      });
    }
  }
}