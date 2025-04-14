import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicIconComponent } from './topic-icon-component.component';

describe('TopicIconComponentComponent', () => {
  let component: TopicIconComponent;
  let fixture: ComponentFixture<TopicIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
