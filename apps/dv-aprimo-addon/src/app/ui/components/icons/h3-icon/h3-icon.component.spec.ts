import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H3IconComponent } from './h3-icon.component';

describe('H3IconComponent', () => {
    let component: H3IconComponent;
    let fixture: ComponentFixture<H3IconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [H3IconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(H3IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
