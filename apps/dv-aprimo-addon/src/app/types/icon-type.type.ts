export const Icons = {
     h1: 'h1',
     h2: 'h2',
     h3: 'h3',
     h4: 'h4',
     h5: 'h5',
     doctable: 'doctable',
     figure: 'figure',
     equation: 'equation',
     composite: 'composite',
     info: 'info',
     settings: 'settings',
     topic: 'topic',
     lof: 'lof',
     lor: 'lor',
     lot: 'lot',
     unknown: 'unknown',
} as const;

export type IconType = typeof Icons[keyof typeof Icons];
