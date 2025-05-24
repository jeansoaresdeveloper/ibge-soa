import { Component } from '@angular/core';
import { IbgeService } from '../ibge.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'atividade-3',
  standalone: true,
  imports: [ReactiveFormsModule, ChartComponent, CommonModule],
  providers: [IbgeService],
  templateUrl: './atividade-3.component.html',
  styleUrl: './atividade-3.component.scss',
})
export class Atividade3Component {
  form: FormGroup<any> = new FormGroup({});
  data: {
    labels: string[];
    datasets: [
      { label: string; data: number[]; borderWidth: number },
      { label: string; data: number[]; borderWidth: number }
    ];
  } | null = null;

  showKenji = false;

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
      pessoaDois: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((form) => {
      this.requestIbge(form);
      this.verifyShowKenji(form);
    });
  }

  private buildDataForChart(response: any) {
    if (!response) {
      this.data = null;
      return;
    }

    const labels = response[0].res.map((periodos: any) => {
      return periodos.periodo.replace(/[\[\]]/g, '').replace(',', '-');
    });

    const datasets = response.map((pessoa: any) => {
      const data = pessoa.res.map((frequencias: any) => frequencias.frequencia);

      return {
        label: pessoa.nome,
        data: data,
        borderWidth: 1,
      };
    });

    this.data = {
      labels: labels,
      datasets: datasets,
    };
  }

  requestIbge(form: any) {
    if (!this.form.valid) return;

    this.ibgeService
      .findByNomes([form.pessoaUm, form.pessoaDois])
      .subscribe((response) => this.buildDataForChart(response));
  }

  private verifyShowKenji(form: any) {
    this.showKenji = form.pessoaUm === 'taldo' && form.pessoaDois === 'kenji';
    this.showKenji = false;
  }
}
