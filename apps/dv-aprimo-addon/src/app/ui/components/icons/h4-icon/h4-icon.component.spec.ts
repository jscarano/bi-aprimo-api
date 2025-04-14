import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H4IconComponent } from './h4-icon.component';

describe('H4IconComponent', () => {
    let component: H4IconComponent;
    let fixture: ComponentFixture<H4IconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [H4IconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(H4IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
