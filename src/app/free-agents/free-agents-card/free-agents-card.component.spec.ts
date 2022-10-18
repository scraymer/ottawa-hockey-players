import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAgentsCardComponent } from './free-agents-card.component';

describe('FreeAgentsCardComponent', () => {
  let component: FreeAgentsCardComponent;
  let fixture: ComponentFixture<FreeAgentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAgentsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeAgentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
