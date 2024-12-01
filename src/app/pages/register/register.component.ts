import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ShowTService } from '../../core/services/show-t.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

  

})
export class RegisterComponent {
  // Propiedades para almacenar los datos del formulario
  usuario: string = '';
  contrasena: string = '';
  nombre: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private showTService: ShowTService
  ) {}

  // Método para manejar el envío del formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      // aca registro

      this.authService
        .register(this.nombre, this.usuario, this.contrasena)
        .subscribe(
          (response) => {
            console.log('response' + response);
            if (response.success) {       
              this.showTService.showMessage("success", 'Exito', "Cuenta creada con exito");
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            console.error('Error en la solicitud:', error);
            this.showTService.showMessage('error', 'Error', error.error.error);
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

 /*  showT(msj: string, tipo: string, summary: string) {
    this.messageService.add({
      severity: tipo,
      summary: summary,
      detail: msj,
    });
  } */
}
