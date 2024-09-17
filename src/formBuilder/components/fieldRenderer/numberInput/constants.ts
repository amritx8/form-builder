export enum NumberInputTypes {
    DEFAULT = 'DEFAULT',
    PERCENTAGE = 'PERCENTAGE',
    RATIO = 'RATIO',
}

export const SUPPORTED_NUMBER_INPUT_TYPES = [
    { id: NumberInputTypes.DEFAULT, label: 'Default' },
    { id: NumberInputTypes.PERCENTAGE, label: 'Percentage' },
    { id: NumberInputTypes.RATIO, label: 'Ratio' },
];