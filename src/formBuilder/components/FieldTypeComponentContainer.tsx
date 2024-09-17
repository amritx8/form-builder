// components
import Form from 'react-bootstrap/Form';
import { FieldTitleInput } from './FieldTitleInput'
import { NumberInput } from './fieldRenderer/numberInput/NumberInput'

// icons
import { IoChevronUpOutline } from "react-icons/io5";

// constants
import { FieldType } from '../constants'
import { ActionType } from '../actionTypes';

// types
import type { ReactElement, FunctionComponent, PropsWithChildren, SyntheticEvent } from "react";
import type { OnAction, Config } from '../types';
import type { Props as NumberInputProps } from './fieldRenderer/numberInput/types'

const SUPPORTED_FIELD_TYPES = [
    { id: FieldType.NUMBER, label: 'Number'},
    { id: FieldType.TEXT, label: 'Text'},
  ]
  
  const FIELD_TYPE_COMPONENT_MAP: Partial<Record<FieldType, FunctionComponent<PropsWithChildren<NumberInputProps>>>> = {
    [FieldType.NUMBER]: NumberInput,
  }

type Props = {
    config: Config,
    onAction: OnAction,
}

export const FieldTypeComponentContainer = (props: Props): ReactElement => {
    const { config, onAction } = props;
    const { id, title, fieldType, helperText, required, fieldTypeConfig } = config;
  
    const onConfigChange = (updatedConfig: Config): void => {
      onAction({
        type: ActionType.UPDATE,
        payload: {
          config: updatedConfig,
        }
      });
    };

    const handleTitleChange = (title: string): void => {
        onConfigChange({
            ...config,
            title,
        });
    }

    const handleFieldConfigChange = (fieldTypeConfig: any): void => {
        onConfigChange({
            ...config,
            fieldTypeConfig,
        });
    }
  
    const Component = FIELD_TYPE_COMPONENT_MAP[fieldType];
  
    return (
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex justify-between gap-4'>
          <div className='w-full'>
            <FieldTitleInput title={title} onTitleChange={handleTitleChange} />
          </div>
          <button onClick={() => {
            onAction({ type: ActionType.TOGGLE_COLLAPSE, payload: { id }});
          }}>
            <IoChevronUpOutline size={20} />
          </button>
        </div>
        <div className='w-full flex justify-between items-center gap-4'>
          <Form.Select size="lg" onChange={event => onAction({
                type: ActionType.UPDATE,
                payload: {
                config: {
                    ...config,
                    fieldType: event.currentTarget.value as FieldType,
                }
                }
            })}
            className='border-2 border-solid border-slate-300'
          >
            {SUPPORTED_FIELD_TYPES.map(type => <option key={type.id} value={type.id} className='bg-white p-2 text-slate-300'>{type.label}</option>)}
          </Form.Select>
          <Form.Check
            type="switch"
            label="Required"
            checked={required}
            onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                onConfigChange({
                    ...config,
                    required: !!event.currentTarget.value,
                });
            }}
          />
        </div>
        <div className='w-full flex justify-between items-center gap-4'>
          <div className='w-full border-2 border-solid border-slate-300 rounded-md py-2 px-3'>
            <input
                type="text"
                value={helperText}
                onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                    onConfigChange({
                        ...config,
                        helperText: event.currentTarget.value,
                    })
                }}
                className='h-8 w-full p-0 border-none outline-none'
                placeholder='Helper Text'
            />
          </div>
        </div>
        {Component ?
          <div className='w-full flex justify-between items-center gap-4'>
            <Component fieldConfig={fieldTypeConfig} onFieldConfigChange={handleFieldConfigChange} />
          </div>
        : null}
      </div>
    )
  }
  