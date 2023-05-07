import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditHeroComponent } from './edit-hero.component';
import { SuperHeroService } from 'src/app/services/super-hero.service';
import { SuperHero } from 'src/app/models/super-hero';
import { Observable, of } from 'rxjs';

describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;
  let superHeroService: SuperHeroService;

  //configures the testing module, which
  //  -declares the component under test
  //  -imports the necessary modules
  //  -provides the required services
  //this method returns a promise that resolves when the configuration is complete, 
  //and thus the async/await syntax is used to wait for the completion
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHeroComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [ SuperHeroService ]
    })
    .compileComponents();
  });

  //this second before each block:
  //1. initializes the component under the test
  //2. injects the service required for the test
  //3. sets the necessary input property of the component
  //    *this is important since the component has an ngIf directive, and thus the template will not be rendered until input property has been set
  //4. finally calls fixture.deterctChanges -> triggers change detection, which causes the template to be rendered and all child components to be initalized
  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    superHeroService = TestBed.inject(SuperHeroService);
    
    //since I am using an ngIf, we must declare the variable and ensure the form is displayed prior to any tests
    const editHero: SuperHero = { id: 1, name: 'Spider-Man', firstName: 'Peter', lastName: 'Parker', place: 'New York City' };
    component.editHero = editHero;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call editSuperHero method of SuperHeroService and emit heroesUpdatedEventEmitter event when the form is submitted', () => {
    const mockSuperHeroes: SuperHero[] = [
      { id: 1, name: 'Spider-Man', firstName: 'Peter', lastName: 'Parker', place: 'New York City' },
      { id: 2, name: 'Iron Man', firstName: 'Tony', lastName: 'Stark', place: 'Malibu' },
      { id: 3, name: 'Captain America', firstName: 'Steve', lastName: 'Rogers', place: 'Brooklyn' }
    ];
    const editHero: SuperHero = { id: 1, name: 'Spider-Man', firstName: 'Peter', lastName: 'Parker', place: 'New York City' };
    spyOn(superHeroService, 'editSuperHero').and.returnValue(of(mockSuperHeroes));
    spyOn(component.heroesUpdatedEventEmitter, 'emit');
    component.editHero = editHero;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(superHeroService.editSuperHero).toHaveBeenCalledWith(editHero);
    expect(component.heroesUpdatedEventEmitter.emit).toHaveBeenCalledWith(mockSuperHeroes);
  });
});
