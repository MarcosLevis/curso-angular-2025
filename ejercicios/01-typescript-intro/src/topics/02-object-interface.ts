let skills = ['bash','counter', 'healing', true, 123]
let skills2: string[] = ['bash','counter', 'healing']

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider: Character = {
    name: 'Strider',
    hp: 10,
    skills: ['bash', 'counter']
}

strider.hometown = 'Rivenderll'

console.table(strider)

export {}