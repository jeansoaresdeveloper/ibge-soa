import { Component } from '@angular/core';
import { IbgeService } from '../ibge.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'atividade-3',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  } | null = null; // TODO: USAR PARA FAZER O ULTIMO QUANDO BUSCAR OS DOIS NOMES
  // USAR O REPLACE DA ATIVIDADE 1 PARA FORMATAR AS LABELS
  chart: any = [];

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

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((form) => this.requestIbge(form));
  }

  requestIbge(form: any) {
    if (!this.form.valid) return;

    this.ibgeService
      .findByNomes([form.pessoaUm, form.pessoaDois])
      .subscribe((response) => console.log(response));
  }
}
