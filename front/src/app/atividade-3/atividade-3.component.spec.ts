import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atividade3Component } from './atividade-3.component';

describe('Atividade3Component', () => {
  let component: Atividade3Component;
  let fixture: ComponentFixture<Atividade3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atividade3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Atividade3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
