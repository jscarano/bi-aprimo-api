import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2IconComponent } from './h2-icon.component';

describe('H2IconComponent', () => {
    let component: H2IconComponent;
    let fixture: ComponentFixture<H2IconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [H2IconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(H2IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
