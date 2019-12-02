import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav.component';
import { MasterEranca } from '../../../masterEranca';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends MasterEranca implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Jan', 'Fev'];//, 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public a = Math.round(Math.random() * 100);
  public b = Math.round(Math.random() * 100);
  public c = Math.round(Math.random() * 100);
  public d = Math.round(Math.random() * 100);
  public e = Math.round(Math.random() * 100);
  public f = Math.round(Math.random() * 100);
  public g = Math.round(Math.random() * 100);
  public h = Math.round(Math.random() * 100);


  public barChartData: ChartDataSets[] = [
    { data: [this.a, this.h - 1 ], label: 'Prod. + Vendido: Series A' }, //,80, 81, 56, 55, 40
    { data: [this.b, this.g - 2 ], label: 'Prod. - Vendido: Series B' }, //,40, 19, 86, 27, 90
    { data: [this.c, this.f - 3 ], label: 'Prod. - Vendido: Series C' }, //,40, 19, 86, 27, 90
    { data: [this.d, this.e - 4 ], label: 'Prod. - Vendido: Series D' }, //,40, 19, 86, 27, 90
    { data: [this.e, this.d - 5 ], label: 'Prod. - Vendido: Series E' }, //,40, 19, 86, 27, 90
    { data: [this.f, this.c - 6 ], label: 'Prod. - Vendido: Series F' }, //,40, 19, 86, 27, 90
    { data: [this.g, this.b - 4 ], label: 'Prod. - Vendido: Series G' }, //,40, 19, 86, 27, 90
    { data: [this.h, this.a - 2 ], label: 'Prod. - Vendido: Series H' }, //,40, 19, 86, 27, 90
  ];

  constructor(private componenteMenu: MainNavComponent,private cookie: CookieService,
    private route: Router) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Dashboard");
   }

  ngOnInit() {
    this.verificaLogado();
  }

  verificaLogado() {
    if (this.cookie.get('userLogado') == "") {
      this.route.navigate(['/user/login']);
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Adicionadas ao', 'Carrinho'], ['Vendas', 'Em', 'Estoque'], ['Vendas', 'Canceladas']];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  // events
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  ngOnDestroy() {
    this;
  }
}
