import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-add',
  templateUrl: './dragonball-add.component.html',
})
export class DragonballAddComponent {

  name = signal('')
  power = signal(0)

  newCharacter = output<Character>()

  addCharacter(){
    if( !this.name() || !this.power() || this.power() < 0 ){
      return;
    }
    const character: Character = {
      id: Math.floor(Math.random() * 1000), //no importa esto es proveido x el backend
      name: this.name(), 
      power:this.power()
    };
    // this.characters.update((list) => [...list, character]);

    this.newCharacter.emit(character)
    this.resetFields()
  }

resetFields(){
  this.name.set('');
  this.power.set(0);
  }

}
