import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LayoutComponent } from './layout/layout';
import { MockComponent } from 'ng-mocks';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponent(LayoutComponent)],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('rmp-layout')).toBeDefined();
 
  });
});
