import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { Character } from '../../interfaces/character.interface';
import { DragonballAddComponent } from "../../components/dragonball/dragonball-add/dragonball-add.component";
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-pages',
  templateUrl: './dragonball-super-pages.component.html',
  imports: [CharacterListComponent, DragonballAddComponent],
})
export class DragonballSuperPagesComponent {

    public dragonballService = inject(DragonBallService)


}
