// components
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';

// constants
import { SUPPORTED_NUMBER_INPUT_TYPES } from './constants'

// types
import type { ReactElement } from 'react';
import type { NumberInputTypes } from './constants'
import type { Props } from './types'

export const NumberInput = (props: Props): ReactElement => {
    const { fieldConfig, onFieldConfigChange } = props;

    const type = fieldConfig?.type;
    const min = fieldConfig?.min;
    const max = fieldConfig?.max;

    return (
        <div className='flex gap-4 items-center justify-between'>
            <Form.Select className="w-full" onChange={event => {
                onFieldConfigChange({
                    ...fieldConfig,
                    type: event.currentTarget.value as NumberInputTypes,
                })
            }}>
                {SUPPORTED_NUMBER_INPUT_TYPES.map(({id, label}) => <option id={id} value={id} selected={id === type}>{label}</option>)}
            </Form.Select>
            <InputGroup className="w-full" >
                <FormControl
                    type="number"
                    value={min}
                    onChange={event => {
                        onFieldConfigChange({
                            ...fieldConfig!,
                            min: Number(event.currentTarget.value),
                        });
                    }}
                    placeholder="Enter a min value"
                />
            </InputGroup>
            <InputGroup className="w-full" >
                <FormControl
                    type="number"
                    value={max}
                    onChange={event => {
                        onFieldConfigChange({
                            ...fieldConfig!,
                            max: Number(event.currentTarget.value),
                        });
                    }}
                    placeholder="Enter a max value"
                />
            </InputGroup>
        </div>
    )
}