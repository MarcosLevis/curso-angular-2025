
interface AudioPlayer{
    audioVolume: number;
    soundDuration: number;
    song: string;
    details: Details
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    soundDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed sheeran',
        year: 2015
    }
}
const song = 'Tu cancion'

const { 
    song: anotherSong, 
    soundDuration: soundDuration,
    details
} = audioPlayer;

const { author } = details;

// console.log('Song: ', anotherSong)

// const dbz: string [] = ['Goku', 'Vegeta', 'Trunk']
// const trunks = dbz[3] || 'No hay personake'
// console.log('Personaje 3: ', trunks)

// console.error('Personake 3:', dbz[3] || 'No hay personaje')


const [p1, p2 , trunks]: string [] = ['Goku', 'Vegeta', 'Trunk']
console.log ('Personaje: ', trunks)



export{}