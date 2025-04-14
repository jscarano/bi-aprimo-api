import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeIconComponent } from './composite-icon.component';

describe('CompositeIconComponent', () => {
    let component: CompositeIconComponent;
    let fixture: ComponentFixture<CompositeIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompositeIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompositeIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
