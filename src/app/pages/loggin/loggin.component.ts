import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent implements OnInit {
  login: boolean = false;
  user: Users;
  private coolieValue: string;

  constructor(private _snackBar: MatSnackBar,
    private userService: UserService,
    private cookie: CookieService,
    private route: Router) { }

  ngOnInit() {
    this.user = {};

    if (this.cookie.get('userLogado') != "") {
      this.route.navigate(['/core/dashboard']);
    }
  }

  mudaForm() {
    this.login = !this.login;
  }

  logar() {
    if (this.user.email && this.user.password) {
      this.userService.verificaUser(this.user.email, this.user.password).subscribe((res: Users) => {
        if (res) {
          if (res.email) {
            console.log(res);
            this.cookie.set('userLogado', res.userId.toString());
            this.route.navigate(['/core/dashboard']);
          } else {
            this.openSnackBar();
          }
        } else {
          this.openSnackBar();
        }
      });
    } else {
      this.openSnackBar();
    }
  }

  register() {
    if (this.user.password == this.user.confirmPassword) {
      if (this.user.email && this.user.password) {
        this.userService.verificaUser(this.user.email, this.user.password).subscribe((res: Users) => {
          if (res) {
            if (res.email) {
              this._snackBar.open('E-mail existente.', 'OK', {
                duration: 2000,
              });
            }
          } else {
            this.userService.registerUser(this.user.email, this.user.password).subscribe((res: any) => {
              if (res) {
                if (res.email) {
                  console.log(res);
                  this.cookie.set('userLogado', res.userId.toString());
                  this.route.navigate(['/core/dashboard']);
                } else {
                  this.openSnackBar();
                }
              }
            });
          }
        });
      } else {
        this._snackBar.open('Campos não preenchidos.', 'OK', {
          duration: 2000,
        });
      }
    } else {
      this._snackBar.open('Senhas não compatíveis.', 'OK', {
        duration: 2000,
      });
    }
  }

  openSnackBar() {
    this._snackBar.open('E-mail/Senha inválidos', 'OK', {
      duration: 2000,
    });
  }
}
