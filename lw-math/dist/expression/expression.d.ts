import { INode } from '../nodes/nodes.ts';
import { IRenderOptions } from '../render/render.ts';
import { IEvaluateOptions } from '../evaluate/evaluate.ts';
export declare class Expression {
    #private;
    readonly defaultValue?: string | number | undefined;
    get root(): import("../nodes/nodeTypes.ts").IRootFactor;
    constructor(defaultValue?: string | number | undefined);
    setValue(value?: INode | string | number): void;
    push(nodeOrValue: INode | string | number): void;
    pushNode(node: INode): void;
    pop(): void;
    closeBracket(): void;
    render(options?: Partial<IRenderOptions>): string;
    evaluate(options?: Partial<IEvaluateOptions>): number;
}
export declare const createExpression: (defaultValue?: string | number) => Expression;
