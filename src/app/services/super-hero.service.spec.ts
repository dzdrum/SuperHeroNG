import { HttpClient } from "@angular/common/http";
import { SuperHeroService } from "./super-hero.service";
import { SuperHero } from "../models/super-hero";
import { __asyncValues } from "tslib";
import { Observable, of } from "rxjs";


describe('SuperHeroService unit tests', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let superHeroService: SuperHeroService;

    beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    superHeroService = new SuperHeroService(httpClientSpy);
    });

    it('getSuperHeroes should return expected heroes (HttpClient called once)', (done: DoneFn) => {
        const mockSuperHeroes: SuperHero[] = [
            { id: 1, name: 'Spider-Man', firstName: 'Peter', lastName: 'Parker', place: 'New York City' },
            { id: 2, name: 'Iron Man', firstName: 'Tony', lastName: 'Stark', place: 'Malibu' },
            { id: 3, name: 'Captain America', firstName: 'Steve', lastName: 'Rogers', place: 'Brooklyn' }
          ];

          httpClientSpy.get.and.returnValue(of(mockSuperHeroes));

          superHeroService.getSuperHeros().subscribe({
            next: heroes => {
                expect(heroes)
                    .withContext('expected mockSuperHeroes')
                    .toEqual(mockSuperHeroes);
                done();
            },
            error: done.fail
          });
          expect(httpClientSpy.get.calls.count())
            .withContext('one call')
            .toBe(1);
        });
        
});