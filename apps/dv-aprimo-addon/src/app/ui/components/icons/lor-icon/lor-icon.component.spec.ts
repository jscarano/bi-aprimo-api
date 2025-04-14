import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorIconComponent } from './lor-icon.component';

describe('LorIconComponent', () => {
    let component: LorIconComponent;
    let fixture: ComponentFixture<LorIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LorIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LorIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
