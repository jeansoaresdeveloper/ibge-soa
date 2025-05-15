import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbgeService } from '../ibge.service';
import { debounceTime } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atividade-1',
  standalone: true,
  imports: [ReactiveFormsModule, ChartComponent, CommonModule],
  providers: [IbgeService],
  templateUrl: './atividade-1.component.html',
  styleUrl: './atividade-1.component.scss',
})
export class Atividade1Component {
  form: FormGroup<any> = new FormGroup({});
  data: {
    labels: string[];
    datasets: [{ label: string; data: number[]; borderWidth: number }];
  } | null = null;

  constructor(
    private readonly builder: FormBuilder,
    private readonly ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      pessoaUm: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      decadaUm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1930),
          Validators.max(2100),
        ]),
      ],
      decadaDois: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1930),
          Validators.max(2100),
        ]),
      ],
    });

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((form) => this.requestIbge(form));
  }

  requestIbge(form: any) {
    if (!this.form.valid) return;
    this.data = null;

    this.ibgeService
      .findByNomes([form.pessoaUm])
      .subscribe((response) => this.buildDataForChart(response));
  }

  private buildDataForChart(response: any) {
    if (!response) {
      this.data = null;
      return;
    }

    const decadas = this.buildDecadas();
    const periodosToChart = this.filterPeriodos(
      response[0]?.res ?? [],
      decadas
    );

    const periodosFormatted = periodosToChart.map((periodos) => {
      return periodos.periodo.replace(/[\[\]]/g, '').replace(',', '-');
    });

    const values = periodosToChart.map((periodos) => periodos.frequencia);

    this.data = {
      labels: periodosFormatted,
      datasets: [
        {
          label: response[0]?.nome ?? 'N/D',
          data: values,
          borderWidth: 1,
        },
      ],
    };
  }

  private filterPeriodos(response: any, decadas: any) {
    let considerar = false;
    const periodosToChart: any[] = [];

    response.forEach((res: any) => {
      if (res.periodo.includes(decadas.decadaUm)) considerar = true;

      if (considerar) periodosToChart.push(res);

      if (res.periodo.includes(decadas.decadaDois)) considerar = false;
    });

    return periodosToChart;
  }

  private buildDecadas() {
    const decadaUm = this.form.get('decadaUm')?.value;
    const decadaDois = this.form.get('decadaDois')?.value;

    const decadaUmSliced = decadaUm.toString().slice(0, 3) + '0';
    const decadaDoisSliced = decadaDois.toString().slice(0, 3) + '0';

    return {
      decadaUm: decadaUmSliced + ',',
      decadaDois: decadaDoisSliced + '[',
    };
  }
}
