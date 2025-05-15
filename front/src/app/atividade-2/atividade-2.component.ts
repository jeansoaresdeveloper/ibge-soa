import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbgeService } from '../ibge.service';
import { debounceTime } from 'rxjs';

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
      .subscribe((form) => this.requestIbge(form));
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

  requestIbge(form: any) {
    if (!this.form.valid) return;
  }
}
