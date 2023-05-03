import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SuperHero } from 'src/app/models/super-hero';
import { SuperHeroService } from 'src/app/services/super-hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent {
  superHero: SuperHero = new SuperHero();

  constructor(private superHeroService: SuperHeroService) {}

  @Input() editHero?: SuperHero; 
  //need to let the parent know the data has changed so it can reload the grid
  @Output() heroesUpdatedEventEmitter = new EventEmitter<SuperHero[]>();

  ngOnInit() {

  }

  onSubmit() {
    //call the service
    if(this.editHero)
    {
      this.superHeroService.editSuperHero(this.editHero)
      .subscribe((heroes: SuperHero[]) => this.heroesUpdatedEventEmitter.emit(heroes));
    }
  }



}
