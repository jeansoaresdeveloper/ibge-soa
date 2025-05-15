import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atividade2Component } from './atividade-2.component';

describe('Atividade2Component', () => {
  let component: Atividade2Component;
  let fixture: ComponentFixture<Atividade2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atividade2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Atividade2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
