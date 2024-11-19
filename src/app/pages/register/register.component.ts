import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 // Propiedades para almacenar los datos del formulario
 usuario: string = '';
 contrasena: string = '';
 nombre: string = '';

 constructor(private router: Router) {}


 // Método para manejar el envío del formulario
 onSubmit(form: NgForm) {
   if (form.valid) {
     console.log('Formulario válido');
     console.log('Nombre:', this.nombre);
     console.log('Usuario:', this.usuario);
     console.log('Valores del formulario:', form.value);
     // aca logeo
     

     this.router.navigate(['/login']);
   } else {
     // Marcar todos los campos como touched para mostrar los errores
     Object.keys(form.controls).forEach(key => {
       const control = form.controls[key];
       control.markAsTouched();
     });
   }
 }
}