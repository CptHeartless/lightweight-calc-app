import {
  createBracketFactor,
  createConstantFactor,
  createFunctionFactor,
  createNumberFactor,
  createPostfixFactor,
  createRootFactor,
  createTerm,
} from '../nodes/createNode.ts';
import { TermPriority } from '../nodes/manipulation.ts';
import { INode, IRootFactor, TermName, TExpressionFactor } from '../nodes/nodeTypes.ts';

const rNumber = /^[\d.E]+/;
const rConst = /^\w+/;
const rFunc = /^\w+\(/;
const rOperator = /^[-/*+]/;
const rPostfixOperator = /^!/;
const rWhiteSpace = /^\s*/;
const rBracket = /^\(|^\)/;
const rComma = /^,/;

export enum TokenType {
  Number,
  Constant,
  Function,
  Operator,
  PostfixOperator,
  Bracket,
  Comma,
}

const TypeToRegex = [
  [TokenType.Number, rNumber],
  [TokenType.Comma, rComma],
  [TokenType.Bracket, rBracket],
  [TokenType.Function, rFunc],
  [TokenType.Constant, rConst],
  [TokenType.PostfixOperator, rPostfixOperator],
  [TokenType.Operator, rOperator],
] as const;

export interface TToken {
  type: TokenType;
  value: string;
}

export const tokenize = function* (str: string): Generator<TToken, any, boolean | undefined> {
  let caret = 0;
  let isPeek: boolean | undefined = false;

  while (caret < str.length) {
    caret += str.slice(caret).match(rWhiteSpace)?.[0].length ?? 0;
    const part = str.slice(caret);

    for (let [tokenType, regex] of TypeToRegex) {
      const match = part.match(regex)?.[0];
      if (match) {
        if (isPeek) caret -= match.length;
        isPeek = yield { type: tokenType, value: match };
        caret += match.length;
        break;
      }
      if (tokenType === TypeToRegex.at(-1)?.[0]) {
        throw new Error('Unexpected token');
      }
    }
  }
};

export const parseExpression = (str: string) => {
  const tokenStream = tokenize(str);
  const expressionFactors: TExpressionFactor[] = [];

  const parseUnaryExpression = (): INode => {
    const token = tokenStream.next().value;
    if (!token) throw new Error('Invalid input');

    if (token.type === TokenType.Number) {
      return createNumberFactor(token.value);
    }

    if (token.type === TokenType.Constant) {
      return createConstantFactor(token.value);
    }

    if (token.value === '(') {
      const bracketsFactor = createBracketFactor();
      expressionFactors.unshift(bracketsFactor);
      const expression = parseBinaryExpression(0);
      if (tokenStream.next()?.value.value !== ')' || Array.isArray(expression)) {
        throw new Error('Expected ")"');
      }
      bracketsFactor.right = expression;
      bracketsFactor.isClosed = true;
      return bracketsFactor;
    }

    if (token.type === TokenType.Function) {
      const functionFactor = createFunctionFactor(token.value.slice(0, -1));
      expressionFactors.unshift(functionFactor);
      const expression = parseBinaryExpression(0);
      if (tokenStream.next()?.value.value !== ')') {
        throw new Error('Expected ")"');
      }
      if (Array.isArray(expression)) {
        functionFactor.isArgRequired = true;
        functionFactor.left = expression[0];
        functionFactor.right = expression[1];
      } else {
        functionFactor.isArgRequired = false;
        functionFactor.right = expression;
      }

      functionFactor.isClosed = true;
      return functionFactor;
    }

    if (token.type === TokenType.Operator) {
      let arg = parseUnaryExpression();
      while (tokenStream.next(true)?.value?.type === TokenType.PostfixOperator) {
        arg = createPostfixFactor(tokenStream.next().value.value, arg);
      }
      const term = createTerm(token.value);
      term.right = arg;
      return term;
    }

    throw new Error('unknown token');
  };

  const getTokenPriority = (token: TToken): number => {
    if (token.type === TokenType.Operator) {
      return TermPriority[token.value as TermName] ?? 3;
    }
    if (token.type === TokenType.Comma) {
      return 0.5;
    }

    return 0;
  };

  const parseBinaryExpression = (minPriority = 0): INode | [INode, INode] => {
    let left = parseUnaryExpression();

    while (tokenStream.next(true)?.value?.type === TokenType.PostfixOperator) {
      left = createPostfixFactor(tokenStream.next().value.value, left);
    }

    while (true) {
      const operatorOrComma = tokenStream.next(true).value;
      if (!operatorOrComma) return left;
      const priority = getTokenPriority(operatorOrComma);
      if (priority <= minPriority) {
        return left;
      } else if (operatorOrComma.type === TokenType.Comma) {
        tokenStream.next();
        const right = parseBinaryExpression();
        if (Array.isArray(right)) throw new Error('Unexpected comma');
        return [left, right];
      }
      tokenStream.next();
      const right = parseBinaryExpression(priority);
      if (Array.isArray(right)) throw new Error('Unexpected comma');
      const term = createTerm(operatorOrComma.value);
      term.left = left;
      term.right = right;
      left = term;
    }
  };

  const parse = (): INode => {
    const expression = parseBinaryExpression(0);

    if (Array.isArray(expression)) {
      throw new Error('Unexpected comma');
    }

    return expression;
  };

  const makeRoot = (node: INode): IRootFactor => {
    const root = createRootFactor();

    root.right = node;
    root.$$expressions = expressionFactors;

    return root;
  };

  return makeRoot(parse());
};
