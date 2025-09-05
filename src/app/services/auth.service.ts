import { Injectable, OnInit, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private store = inject(Store);

  private _user!: Usuario | null;

  get user() {
    return this._user;
  }

  ngOnInit(): void {}

  initAuthListener(): void {
    authState(this.auth)
      .pipe(
        // For each auth change, switch the inner subscription accordingly
        switchMap((fuser) => {
          if (!fuser) {
            // Signed out: clear store and stop inner stream
            this._user = null;
            this.store.dispatch(authActions.unSetUser());
            this.store.dispatch(unSetItems());
            return of(null);
          }
          const ref = doc(this.firestore, `${fuser.uid}/usuario`);
          return docData(ref, { idField: 'id' });
        }),

        // Convert Firestore doc to your domain model (or a plain object)
        map((fsUser) => (fsUser ? Usuario.fromFirebase(fsUser) : null)),

        // Optional: avoid redundant dispatches if the object hasn’t changed
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),

        // Push to the store
        tap((user) => {
          if (user) {
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          }
        })
      )
      .subscribe();
  }

  createUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, email);
        return setDoc(doc(this.firestore, `${user.uid}/usuario`), {
          ...newUser,
        });
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(map((fuser) => fuser != null));
  }
}
