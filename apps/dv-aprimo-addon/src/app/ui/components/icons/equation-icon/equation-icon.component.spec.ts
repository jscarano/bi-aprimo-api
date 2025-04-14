import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationIconComponent } from './equation-icon.component';

describe('EquationIconComponent', () => {
    let component: EquationIconComponent;
    let fixture: ComponentFixture<EquationIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EquationIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EquationIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
