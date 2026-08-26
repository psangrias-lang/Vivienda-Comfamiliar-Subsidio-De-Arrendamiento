export const MUNICIPIOS_RISARALDA = [
  { id: 'pereira', nombre: 'Pereira (Capital)' },
  { id: 'dosquebradas', nombre: 'Dosquebradas' },
  { id: 'santa-rosa', nombre: 'Santa Rosa de Cabal' },
  { id: 'la-virginia', nombre: 'La Virginia' },
  { id: 'belen-umbria', nombre: 'Belén de Umbría' },
  { id: 'santuario', nombre: 'Santuario' },
  { id: 'marsella', nombre: 'Marsella' },
  { id: 'quinchia', nombre: 'Quinchía' },
  { id: 'guatica', nombre: 'Guática' },
  { id: 'mistrato', nombre: 'Mistrató' },
  { id: 'pueblo-rico', nombre: 'Pueblo Rico' },
  { id: 'apia', nombre: 'Apía' },
  { id: 'balboa', nombre: 'Balboa' },
  { id: 'la-celia', nombre: 'La Celia' },
] as const;

export const BARRIOS_FRECUENTES_RISARALDA: Record<string, string[]> = {
  'Pereira (Capital)': [
    'Centro',
    'Cuba / San Joaquín',
    'Villavicencio',
    'Boston',
    'Alfonso López',
    'Los Álamos',
    'Villa Santana / El Danubio',
    'Pinares',
    'Parque Industrial',
    'Cerritos',
    'Tribunas Córcega (Vereda)',
    'La Florida (Corregimiento)',
    'Puerto Caldas (Corregimiento)',
    'Altagracia (Corregimiento)',
    'Otro sector / Vereda'
  ],
  'Dosquebradas': [
    'La Pradera',
    'Santa Mónica',
    'El Campestre',
    'Los Naranjos',
    'Frailes',
    'Japón',
    'La Badea',
    'Camilo Torres',
    'San Fernando',
    'La Sultana',
    'Comuneros',
    'Vereda El Estanquillo',
    'Otro sector / Vereda'
  ],
  'Santa Rosa de Cabal': [
    'Centro',
    'La Hermosa',
    'La Eugenia',
    'San Vicente',
    'El Manzanillo',
    'Vereda San Ramón',
    'Vereda La Leona',
    'Otro sector / Vereda'
  ],
  'La Virginia': [
    'Centro',
    'San Cayetano',
    'Alfonso López',
    'Paredes de Palse',
    'Buenos Aires',
    'Vereda El Aguacate',
    'Otro sector / Vereda'
  ]
};
