import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedComponentComponent } from './selected-component.component';

describe('SelectedComponentComponent', () => {
  let component: SelectedComponentComponent;
  let fixture: ComponentFixture<SelectedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
