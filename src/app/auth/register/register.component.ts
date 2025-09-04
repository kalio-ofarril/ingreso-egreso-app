import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);

  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }
    const { nombre, email, password } = this.registroForm.value;
    this.authService
      .createUsuario(nombre, email, password)
      .then((credenciales) => this.router.navigate(['/']))
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        });
      });
  }
}
