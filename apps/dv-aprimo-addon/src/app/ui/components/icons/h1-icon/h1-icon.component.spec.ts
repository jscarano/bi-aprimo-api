import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H1IconComponent } from './h1-icon.component';

describe('H1IconComponent', () => {
    let component: H1IconComponent;
    let fixture: ComponentFixture<H1IconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [H1IconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(H1IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
