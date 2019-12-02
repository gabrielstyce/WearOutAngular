import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MasterEranca } from '../../masterEranca';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent extends MasterEranca {
  public userVerificado = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    @Input() public titleTela: string = "";

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private cookie: CookieService,
              ) {
    super();
  }


  // NAVIGATE & MUDANÇÂS RELACIONADAS AO MENU
  protected navigateMenu(tela: string) {
    if (tela != 'Sair')
      this.router.navigate([super.nomesTela(tela)]);
    
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['user/login']);
  }
}

