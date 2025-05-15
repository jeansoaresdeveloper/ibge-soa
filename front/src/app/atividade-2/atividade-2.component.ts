import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbgeService } from '../ibge.service';
import { debounceTime, forkJoin, map } from 'rxjs';

@Component({
  selector: 'atividade-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [IbgeService],
  templateUrl: './atividade-2.component.html',
  styleUrl: './atividade-2.component.scss',
})
export class Atividade2Component {
  form: FormGroup<any> = new FormGroup({});
  ufs: any[] = [];
  municipios: any[] = [];
  frequencias: {
    decada: number;
    nome: string;
    frequencia: string;
    ranking: string;
  }[] = [];

  readonly decadas = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

  constructor(
    private readonly builder: FormBuilder,
    private readonly ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      uf: [null, Validators.required],
      municipio: [null],
    });

    this.requestUfs();

    this.form
      .get('uf')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => this.findMunicios(value));

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((form) => this.requestIbge());
  }

  requestUfs() {
    this.ibgeService.findUfs().subscribe(
      (response) =>
        (this.ufs = response.map((value) => {
          return {
            id: value.id,
            sigla: value.sigla,
            nome: value.nome,
          };
        }))
    );
  }

  findMunicios(id: number) {
    this.ibgeService.findMunicipiosByUF(id).subscribe(
      (response) =>
        (this.municipios = response.map((value) => {
          return {
            id: value.id,
            nome: value.nome,
          };
        }))
    );
  }

  requestIbge() {
    if (!this.form.valid) return;

    const id = this.form.get('municipio')?.value
      ? this.form.get('municipio')?.value
      : this.form.get('uf')?.value;

    const requests = this.decadas.map((decada) =>
      this.ibgeService.findRankingById(id, decada).pipe(
        map((valores) => {
          const pessoas: any = valores[0]?.res?.slice(0, 3) ?? [];

          return {
            decada: decada,
            nome: pessoas.map((p: any) => p.nome).join('<br/>'),
            ranking: pessoas.map((p: any) => p.ranking).join('<br/>'),
            frequencia: pessoas.map((p: any) => p.frequencia).join('<br/>'),
          };
        })
      )
    );

    forkJoin(requests).subscribe((response) => {
      this.frequencias = response;
    });
  }
}
