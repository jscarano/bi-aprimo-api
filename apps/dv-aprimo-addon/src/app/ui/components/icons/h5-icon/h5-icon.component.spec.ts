import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H5IconComponent } from './h5-icon.component';

describe('H5IconComponent', () => {
    let component: H5IconComponent;
    let fixture: ComponentFixture<H5IconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [H5IconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(H5IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
