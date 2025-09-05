import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngersoEgresoService } from '../services/ingerso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './ingreso-egreso.component.html',
  styles: ``,
})
export class IngresoEgresoComponent implements OnInit {
  private ingresoEgresoService = inject(IngersoEgresoService);
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;

  constructor() {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        this.loading = state.isLoading;
      });
  }

  ngOnInit(): void {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar() {
    this.store.dispatch(isLoading());

    if (this.ingresoForm.invalid) {
      return;
    }

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo, '');

    this.ingresoEgresoService
      .crearIngreoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
