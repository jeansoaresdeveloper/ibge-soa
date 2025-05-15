import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbgeService } from './ibge.service';
import { Atividade1Component } from './atividade-1/atividade-1.component';
import { Atividade2Component } from './atividade-2/atividade-2.component';
import { Atividade3Component } from './atividade-3/atividade-3.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Atividade1Component,
    Atividade2Component,
    Atividade3Component,
  ],
  providers: [IbgeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  form: FormGroup<any> = new FormGroup({});

  constructor(private readonly builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      atividade: [2, Validators.required],
    });
  }
}
