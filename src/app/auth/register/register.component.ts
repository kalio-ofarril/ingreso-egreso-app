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
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);

  registroForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed())
      .subscribe((ui) => {
        this.isLoading = ui.isLoading;
      });
  }

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
    this.store.dispatch(ui.isLoading());
    const { nombre, email, password } = this.registroForm.value;
    this.authService
      .createUsuario(nombre, email, password)
      .then((credenciales) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        });
      });
  }
}
