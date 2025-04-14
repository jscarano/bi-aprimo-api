import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownIconComponent } from './unknown-icon.component';

describe('UnknownIconComponent', () => {
    let component: UnknownIconComponent;
    let fixture: ComponentFixture<UnknownIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnknownIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UnknownIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
