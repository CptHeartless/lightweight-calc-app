export enum NodeTypes {
  Term = 't',
  Factor = 'f',
}

export interface INode {
  type: NodeTypes;
  left?: INode;
  right?: INode;
}

export enum TermName {
  Add = '+',
  Sub = '-',
  Div = '/',
  Mul = '*',
}

export interface ITerm extends INode {
  type: NodeTypes.Term;
  name: TermName;
}

export enum FactorName {
  Root = '~',
  Function = 'f()',
  Brackets = '()',
  Number = 'n',
  Constant = 'c',
  PostfixOperator = 'po',
}

export interface IFactor extends INode {
  type: NodeTypes.Factor;
  name: FactorName;
}

export interface IRootFactor extends IFactor {
  name: FactorName.Root;
  $$expressions: TExpressionFactor[];
}

export interface IFunctionFactor extends IFactor {
  name: FactorName.Function;
  value: string;
  isClosed?: boolean;
  isArgRequired?: boolean;
}

export interface IBracketsFactor extends IFactor {
  name: FactorName.Brackets;
  isClosed?: boolean;
}

export interface INumberFactor extends IFactor {
  name: FactorName.Number;
  value: string;
  isConst?: boolean;
}

export interface IConstantFactor extends IFactor {
  name: FactorName.Constant;
  value: string;
}

export interface IPostfixFactor extends IFactor {
  name: FactorName.PostfixOperator;
  value: string;
}

export type TBracketLikeFactor = IFunctionFactor | IBracketsFactor;
export type TExpressionFactor = IRootFactor | TBracketLikeFactor;
export const isTerm = (node: INode): node is ITerm => node.type === NodeTypes.Term;
export const isFactor = (node: INode): node is IFactor => node.type === NodeTypes.Factor;

interface IFactorNames {
  [FactorName.PostfixOperator]: IPostfixFactor;
  [FactorName.Brackets]: IBracketsFactor;
  [FactorName.Constant]: IConstantFactor;
  [FactorName.Function]: IFunctionFactor;
  [FactorName.Number]: INumberFactor;
  [FactorName.Root]: IRootFactor;
}

export const isFactorOf =
  <N extends FactorName>(name: N) =>
  (node: INode): node is IFactorNames[N] =>
    isFactor(node) && node.name === name;
export const isRootFactor = isFactorOf(FactorName.Root);
export const isBracketFactor = isFactorOf(FactorName.Brackets);
export const isFunctionFactor = isFactorOf(FactorName.Function);
export const isConstantFactor = isFactorOf(FactorName.Constant);
export const isNumberFactor = isFactorOf(FactorName.Number);
export const isPostfixFactor = isFactorOf(FactorName.PostfixOperator);
export const isExpressionFactor = (node: INode): node is TExpressionFactor =>
  isRootFactor(node) || isBracketFactor(node) || isFunctionFactor(node);
export const isBracketsLikeFactor = (node: INode): node is TBracketLikeFactor =>
  isFunctionFactor(node) || isBracketFactor(node);
