import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIconComponent } from './table-icon-component.component';

describe('TableIconComponentComponent', () => {
  let component: TableIconComponent;
  let fixture: ComponentFixture<TableIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
