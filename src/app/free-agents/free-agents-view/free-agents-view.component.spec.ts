import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAgentsViewComponent } from './free-agents-view.component';

describe('FreeAgentsViewComponent', () => {
  let component: FreeAgentsViewComponent;
  let fixture: ComponentFixture<FreeAgentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAgentsViewComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FreeAgentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
