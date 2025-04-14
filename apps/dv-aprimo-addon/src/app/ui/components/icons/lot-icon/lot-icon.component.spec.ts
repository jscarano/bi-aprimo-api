import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotIconComponent } from './lot-icon.component';

describe('LotIconComponent', () => {
    let component: LotIconComponent;
    let fixture: ComponentFixture<LotIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LotIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LotIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
