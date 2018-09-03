import * as React from 'react';
import { EditableIdentifier, EditableProps } from './editable.component';
export declare const EditorProvider: React.ComponentType<React.ProviderProps<any>>, EditorConsumer: React.ComponentType<React.ConsumerProps<any>>;
export declare const EditorHelpersProvider: React.ComponentType<React.ProviderProps<{
    undo: () => void;
    redo: () => void;
    serializeState: (id: EditableIdentifier) => any;
}>>, EditorHelpersConsumer: React.ComponentType<React.ConsumerProps<{
    undo: () => void;
    redo: () => void;
    serializeState: (id: EditableIdentifier) => any;
}>>;
export declare const EditableProvider: React.ComponentType<React.ProviderProps<React.ComponentType<EditableProps>>>, EditableConsumer: React.ComponentType<React.ConsumerProps<React.ComponentType<EditableProps>>>;
