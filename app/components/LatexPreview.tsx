"use client";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface LatexPreviewProps {
  expression: string;
  content: string;
}

type Token =
  | { type: "number"; value: string }
  | { type: "identifier"; value: string }
  | { type: "operator"; value: "+" | "-" | "*" | "/" | "^" }
  | { type: "paren"; value: "(" | ")" };

function tokenize(input: string): Token[] {
  const expr = input
    .replaceAll("**", "^")
    .replaceAll("×", "*")
    .replaceAll("÷", "/");
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    const ch = expr[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (/[0-9.]/.test(ch)) {
      let num = ch;
      i++;
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let id = ch;
      i++;
      while (i < expr.length && /[a-zA-Z]/.test(expr[i])) {
        id += expr[i];
        i++;
      }
      tokens.push({ type: "identifier", value: id });
      continue;
    }

    if ("+-*/^".includes(ch)) {
      tokens.push({
        type: "operator",
        value: ch as "+" | "-" | "*" | "/" | "^",
      });
      i++;
      continue;
    }

    if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch });
      i++;
      continue;
    }

    i++;
  }

  return tokens;
}

function toLatex(expr: string): string {
  if (!expr.trim()) return "";

  const tokens = tokenize(expr);
  let pos = 0;

  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  const wrapIfNeeded = (s: string) => {
    if (
      s.startsWith("\\frac") ||
      s.includes(" + ") ||
      s.includes(" - ") ||
      s.includes(" \\cdot ")
    ) {
      return `\\left(${s}\\right)`;
    }
    return s;
  };

  function parseExpression(): string {
    let left = parseTerm();

    while (
      peek() &&
      peek().type === "operator" &&
      (peek().value === "+" || peek().value === "-")
    ) {
      const op = consume().value;
      const right = parseTerm();
      left = `${left} ${op} ${right}`;
    }

    return left;
  }

  function parseTerm(): string {
    let left = parsePower();

    while (
      peek() &&
      peek().type === "operator" &&
      (peek().value === "*" || peek().value === "/")
    ) {
      const op = consume().value;
      const right = parsePower();

      if (op === "*") {
        left = `${left} \\cdot ${right}`;
      } else {
        left = `\\frac{${left}}{${right}}`;
      }
    }

    return left;
  }

  function parsePower(): string {
    let left = parseUnary();

    while (peek() && peek().type === "operator" && peek().value === "^") {
      consume();
      const right = parseUnary();
      left = `${wrapIfNeeded(left)}^{${right}}`;
    }

    return left;
  }

  function parseUnary(): string {
    if (peek() && peek().type === "operator" && peek().value === "-") {
      consume();
      return `-${parseUnary()}`;
    }
    return parsePrimary();
  }

  function parsePrimary(): string {
    const token = peek();
    if (!token) return "";

    if (token.type === "number") {
      consume();
      return token.value;
    }

    if (token.type === "identifier") {
      const name = consume().value;

      if (peek() && peek().type === "paren" && peek().value === "(") {
        consume();
        const arg = parseExpression();
        if (peek() && peek().type === "paren" && peek().value === ")") {
          consume();
        }

        switch (name) {
          case "sin":
            return `\\sin\\left(${arg}\\right)`;
          case "cos":
            return `\\cos\\left(${arg}\\right)`;
          case "tan":
            return `\\tan\\left(${arg}\\right)`;
          case "arcsin":
            return `\\arcsin\\left(${arg}\\right)`;
          case "arccos":
            return `\\arccos\\left(${arg}\\right)`;
          case "arctan":
            return `\\arctan\\left(${arg}\\right)`;
          case "ln":
            return `\\ln\\left(${arg}\\right)`;
          case "sqrt":
            return `\\sqrt{${arg}}`;
          case "exp":
            return `e^{${arg}}`;
          default:
            return `${name}\\left(${arg}\\right)`;
        }
      }

      return name;
    }

    if (token.type === "paren" && token.value === "(") {
      consume();
      const inner = parseExpression();
      if (peek() && peek().type === "paren" && peek().value === ")") {
        consume();
      }
      return `\\left(${inner}\\right)`;
    }

    consume();
    return "";
  }

  return parseExpression();
}

export default function LatexPreview({ expression, content }: LatexPreviewProps) {
  const latex = toLatex(expression);

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 min-h-[88px]">
      {latex ? (
        <BlockMath
          math={latex}
        />
      ) : (
        <span className="text-sm text-gray-400">{content}</span>
      )}
    </div>
  );
}