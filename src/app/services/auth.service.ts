import { Injectable, OnInit, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private _auth = inject(Auth);
  private firestore = inject(Firestore);

  ngOnInit(): void {}

  initAuthListener() {
    authState(this._auth).subscribe((fuser) => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });
  }

  createUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, email);
        return setDoc(doc(this.firestore, `${user.uid}/usuario`), {...newUser});
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  logout() {
    return signOut(this._auth);
  }

  isAuth() {
    return authState(this._auth).pipe(map((fuser) => fuser != null));
  }
}
