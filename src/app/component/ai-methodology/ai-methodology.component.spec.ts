import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMethodologyComponent } from './ai-methodology.component';

describe('AiMethodologyComponent', () => {
  let component: AiMethodologyComponent;
  let fixture: ComponentFixture<AiMethodologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMethodologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
