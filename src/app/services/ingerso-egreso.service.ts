import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngersoEgresoService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  crearIngreoEgreso(ingresoEgreso: IngresoEgreso) {
    const { descripcion, monto, tipo } = ingresoEgreso;
    const payload = { descripcion, monto, tipo };
    const uid = this.authService.user?.uid;
    const parentDoc = doc(this.firestore, `${uid}/ingresos-egresos`);
    const itemsDoc = collection(parentDoc, `items`);
    return addDoc(itemsDoc, { ...payload });
  }

  initIngresosEgresosListener(uid: string) {
    const parentDoc = doc(this.firestore, `${uid}/ingresos-egresos`);
    const itemsCol = collection(parentDoc, `items`);
    return collectionData(itemsCol, { idField: 'id' });
  }

  borrarIngresoEgreso(id: string) {
    const uid = this.authService.user?.uid;
    return deleteDoc(
      doc(this.firestore, `${uid}/ingresos-egresos/items/${id}`)
    );
  }
}
