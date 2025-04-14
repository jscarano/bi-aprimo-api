import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TocIconComponent } from './toc-icon.component';

describe('TocIconComponent', () => {
    let component: TocIconComponent;
    let fixture: ComponentFixture<TocIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TocIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TocIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
