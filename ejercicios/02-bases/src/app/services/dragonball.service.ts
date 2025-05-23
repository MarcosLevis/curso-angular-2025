import { Injectable, effect, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
    const characters = localStorage.getItem('characters');
    
    //este json.parse estamos enganiando a typescript hay una forma mejor de hacerlo
    //estamos asumiendo que lo que trae el local storage es el tipo de objeto que nosotros busacmos
    return characters ? JSON.parse(characters): [];
}
@Injectable({providedIn: 'root'})

export class DragonBallService {

    characters = signal<Character[]>(loadFromLocalStorage());

    saveToLocalStorage = effect(() => {
        localStorage.setItem('characters', JSON.stringify(this.characters()))
    })



    addCharacter(character: Character){
        this.characters.update((list) => [...list,character])
    }
    
}