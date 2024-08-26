import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Token } from "../models/token.model";
import { AuthService } from "../services/auth.service";

export class SharedComponent {

    constructor(
        public router: Router,
        public authService: AuthService
    ) {}

    verificaTokenValido(): void {
        var subject = new Subject<boolean>();
        const tokenValue = localStorage.getItem('token_Sistema');
        if (tokenValue != null) {
          const tokenObject = new Token();
          tokenObject.token = tokenValue;
          this.authService.verificarTokenPost(tokenObject).subscribe(
            (data) => {
              if (data.success) {
                subject.next(true);
                this.router.navigate(['/principal']);
              } else {
                subject.next(false);
                localStorage.removeItem('nomeCompleto');
                localStorage.removeItem('login');
                localStorage.removeItem('token_Usuario');
                localStorage.removeItem('token_Sistema');
                localStorage.removeItem('funcionalidades');
                if (tokenValue != null) {
                //   this.messageService.add({
                //     severity: 'warn',
                //     summary: this.translate.instant('acesso'),
                //     detail: this.translate.instant('tokenExpirado'),
                //   });
                    alert("SharedComponent.verificaTokenValido(): Token expirado");
                    this.redirectToExternalUrl();
                }
              }
            },
            (error) => {
            //   this.messageService.add({
            //     severity: 'error',
            //     summary: this.translate.instant('erro'),
            //     detail: this.translate.instant('erroInesperado'),
            //   });
                alert("SharedComponent.verificaTokenValido(): Ocorreu um erro");
            }
          );
        }
      }

      redirectToExternalUrl() {
        window.location.href = this.authService.getLoginUrl(); 
      }
}