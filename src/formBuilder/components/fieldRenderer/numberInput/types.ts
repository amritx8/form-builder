// types
import type { NumberInputTypes } from './constants'

export type NumberConfig = {
    type: NumberInputTypes;
    min?: number;
    max?: number;
};

export type Props = {
    fieldConfig: NumberConfig | undefined;
    onFieldConfigChange: (fieldConfig: NumberConfig) => void;
};