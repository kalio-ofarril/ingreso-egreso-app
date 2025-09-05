import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cargando = false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed())
      .subscribe((ui) => {
        this.cargando = ui.isLoading;
        console.log('load subs');
      });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Por favor espere',
    //   didOpen: () => Swal.showLoading(),
    //   willClose: () => Swal.hideLoading(),
    // });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({ icon: 'error', title: 'Oops...', text: e.message });
      });
  }
}
