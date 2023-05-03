import { Component } from '@angular/core';
import { SuperHeroService } from './services/super-hero.service';
import { SuperHero } from './models/super-hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperHero.UI';

  heros: SuperHero[] = [];
  heroToEdit?: SuperHero;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit() : void {
    this.superHeroService
      .getSuperHeros()
      .subscribe((result: SuperHero[]) => (this.heros = result));
  }

  heroesUpdated(heroes: SuperHero[]) {
    this.heros = heroes;
  }

  editHero(hero: SuperHero) {
    this.heroToEdit = hero;
  }
}
