import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DvExampleAddonComponent } from './dv-example-addon.component';

describe('DvExampleAddonComponent', () => {
  let component: DvExampleAddonComponent;
  let fixture: ComponentFixture<DvExampleAddonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvExampleAddonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DvExampleAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
