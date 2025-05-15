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
  selector: 'atividade-1',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [IbgeService],
  templateUrl: './atividade-1.component.html',
  styleUrl: './atividade-1.component.scss',
})
export class Atividade1Component {
  form: FormGroup<any> = new FormGroup({});
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

    this.ibgeService
      .findByNomes([form.pessoaUm])
      .subscribe((response) => console.log(response));
  }
}
