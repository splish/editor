import { Editor } from '@splish-me/ory-editor-core/src';
import * as React from 'react';
export declare const editableSymbol: unique symbol;
export interface EditableIdentifier {
    type: symbol;
    id: string;
}
export declare const createEditableIdentifier: (id?: any) => EditableIdentifier;
declare type State = any;
declare type Plugin = any;
export interface EditableProps {
    defaultPlugin?: Plugin;
    initialState?: State;
    id: EditableIdentifier | State;
}
export declare class Editable extends React.Component<EditableProps> {
    state: {
        error: null;
    };
    render(): JSX.Element;
    componentDidCatch(error: Error, info: any): void;
}
interface RawEditableProps extends EditableProps {
    editor: Editor;
}
export declare class RawEditable extends React.Component<RawEditableProps> {
    static defaultProps: Partial<RawEditableProps>;
    constructor(props: RawEditableProps);
    private parseEditable;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
