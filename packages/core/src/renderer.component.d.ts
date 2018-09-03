import * as React from 'react';
export interface RendererProps {
    state: any;
    plugins: any[];
}
export declare const createRenderer: ({ renderContainer, renderRow, renderCell }: {
    renderContainer: (args: {
        cells: any;
        children: React.ReactNode;
    }) => React.ReactNode;
    renderRow: (args: {
        row: any;
        children: React.ReactNode;
    }) => React.ReactNode;
    renderCell: (args: {
        cell: any;
        children: React.ReactNode;
    }) => React.ReactNode;
}) => React.ComponentType<RendererProps>;
