import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureIconComponent } from './figure-icon.component';

describe('FigureIconComponent', () => {
    let component: FigureIconComponent;
    let fixture: ComponentFixture<FigureIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FigureIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FigureIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
