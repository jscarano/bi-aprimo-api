import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LofIconComponent } from './lof-icon.component';

describe('LofIconComponent', () => {
    let component: LofIconComponent;
    let fixture: ComponentFixture<LofIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LofIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LofIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
