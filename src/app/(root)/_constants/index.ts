import { type Monaco } from "@monaco-editor/react"
import { ThemeDefinition, type Language, type Theme } from "../../../types"

type LanguageConfig = Record<string, Language>

export const FREE_LANGUAGES = ["javascript"]

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: "javascript",
    label: "Javascript",
    logoPath: "/javascript.svg",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// Javascript Playground
const numbers = [1,2,3,4,5]

// Map numbers to their squares
const squares = numbers.map(n => n * n)
console.log('Original numbers:', numbers)
console.log('Squared numbers', squares)

// Filter to even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0)
console.log('Even numbers:', evenNumbers)

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0)
console.log('Sum of numbers:', sum)
`,
  },
  typescript: {
    id: "typescript",
    label: "Typescript",
    logoPath: "/typescript.svg",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// Typescript Playground
const numbers: number[] = [1,2,3,4,5]

// Map numbers to their squares
const squares: number[] = numbers.map(n => n * n)
console.log('Original numbers:', numbers)
console.log('Squared numbers', squares)

// Filter to even numbers
const evenNumbers: number[] = numbers.filter(n => n % 2 === 0)
console.log('Even numbers:', evenNumbers)

// Calculate sum using reduce
const sum: number = numbers.reduce((acc, curr) => acc + curr, 0)
console.log('Sum of numbers:', sum)
`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.svg",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `// C# Playground
using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = {1, 2, 3, 4, 5};

        // Map numbers to their squares
        var squares = numbers.Select(n => n * n);
        Console.WriteLine("Original numbers: " + string.Join(", ", numbers));
        Console.WriteLine("Squared numbers: " + string.Join(", ", squares));

        // Filter to even numbers
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine("Even numbers: " + string.Join(", ", evenNumbers));

        // Calculate sum
        var sum = numbers.Sum();
        Console.WriteLine("Sum of numbers: " + sum);
    }
}
`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.svg",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `// C++ Playground
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // Map numbers to their squares
    std::cout << "Original numbers: ";
    for (int num : numbers) std::cout << num << " ";
    std::cout << "\\nSquared numbers: ";
    for (int num : numbers) std::cout << num * num << " ";

    // Filter to even numbers
    std::cout << "\\nEven numbers: ";
    for (int num : numbers) if (num % 2 == 0) std::cout << num << " ";

    // Calculate sum
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "\\nSum of numbers: " << sum << "\\n";

    return 0;
}
`,
  },
  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.svg",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `// Rust Playground
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Map numbers to their squares
    let squares: Vec<i32> = numbers.iter().map(|&n| n * n).collect();
    println!("Original numbers: {:?}", numbers);
    println!("Squared numbers: {:?}", squares);

    // Filter to even numbers
    let even_numbers: Vec<i32> = numbers.iter().copied().filter(|&n| n % 2 == 0).collect();
    println!("Even numbers: {:?}", even_numbers);

    // Calculate sum
    let sum: i32 = numbers.iter().sum();
    println!("Sum of numbers: {}", sum);
}
`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.svg",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `// Go Playground
package main

import (
    "fmt"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}

    // Map numbers to their squares
    fmt.Println("Original numbers:", numbers)
    squares := []int{}
    for _, num := range numbers {
        squares = append(squares, num*num)
    }
    fmt.Println("Squared numbers:", squares)

    // Filter to even numbers
    evenNumbers := []int{}
    for _, num := range numbers {
        if num%2 == 0 {
            evenNumbers = append(evenNumbers, num)
        }
    }
    fmt.Println("Even numbers:", evenNumbers)

    // Calculate sum
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Println("Sum of numbers:", sum)
}
`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.svg",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python Playground
numbers = [1, 2, 3, 4, 5]

# Map numbers to their squares
squares = [n * n for n in numbers]
print("Original numbers:", numbers)
print("Squared numbers:", squares)

# Filter to even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print("Even numbers:", even_numbers)

# Calculate sum
sum_numbers = sum(numbers)
print("Sum of numbers:", sum_numbers)
`,
  },
  lua: {
    id: "lua",
    label: "Lua",
    logoPath: "/lua.svg",
    pistonRuntime: { language: "lua", version: "5.4.4" },
    monacoLanguage: "lua",
    defaultCode: `-- Lua Playground
local numbers = {1, 2, 3, 4, 5}

-- Map numbers to their squares
print("Original numbers:")
for _, num in ipairs(numbers) do
    io.write(num, " ")
end
print("\\nSquared numbers:")
for _, num in ipairs(numbers) do
    io.write(num * num, " ")
end

-- Filter to even numbers
print("\\nEven numbers:")
for _, num in ipairs(numbers) do
    if num % 2 == 0 then
        io.write(num, " ")
    end
end

-- Calculate sum
local sum = 0
for _, num in ipairs(numbers) do
    sum = sum + num
end
print("\\nSum of numbers:", sum)
`,
  },
}

export const THEMES: Theme[] = [
  {
    id: "vs-dark",
    label: "VS Dark",
    color: "#007acc",
    logoPath: "/vscode.svg",
    isDark: true,
  },
  {
    id: "vs-light",
    label: "VS Light",
    color: "#007acc",
    logoPath: "/vscode.svg",
    isDark: false,
  },
  {
    id: "github-dark",
    label: "GitHub Dark",
    color: "#58a6ff",
    logoPath: "/github.svg",
    isDark: true,
  },
  {
    id: "monokai",
    label: "Monokai",
    color: "#f92672",
    logoPath: "/monokai.svg",
    isDark: true,
  },
  {
    id: "dracula",
    label: "Dracula",
    color: "#ff79c6",
    logoPath: "/dracula.svg",
    isDark: true,
  },
  {
    id: "catppuccin-latte",
    label: "Catppuccin Latte",
    color: "#d20f39",
    logoPath: "/catppuccin-latte.png",
    isDark: false,
  },
  {
    id: "catppuccin-frappe",
    label: "Catppuccin Frappe",
    color: "#94e2d5",
    logoPath: "/catppuccin-macchiato.png",
    isDark: true,
  },
  {
    id: "catppuccin-macchiato",
    label: "Catppuccin Macchiato",
    color: "#8aadf4",
    logoPath: "/catppuccin-macchiato.png",
    isDark: true,
  },
  {
    id: "catppuccin-mocha",
    label: "Catppuccin Mocha",
    color: "#f5c2e7",
    logoPath: "/catppuccin-macchiato.png",
    isDark: true,
  },
]

export const THEME_DEFINITIONS: Record<string, ThemeDefinition> = {
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e7681" },
      { token: "string", foreground: "a5d6ff" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
      { token: "variable", foreground: "ffa657" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#161b22",
      "editorLineNumber.foreground": "#6e7681",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "A6E22E" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "66D9EF" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorLineNumber.foreground": "#75715E",
      "editorIndentGuide.background": "#3E3D32",
      "editor.selectionBackground": "#49483E",
      "editor.inactiveSelectionBackground": "#49483E55",
    },
  },
  dracula: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4" },
      { token: "string", foreground: "f1fa8c" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "number", foreground: "bd93f9" },
      { token: "type", foreground: "8be9fd" },
      { token: "class", foreground: "50fa7b" },
      { token: "function", foreground: "ffb86c" },
      { token: "variable", foreground: "50fa7b" },
      { token: "operator", foreground: "ff79c6" },
    ],
    colors: {
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#44475a",
      "editorLineNumber.foreground": "#6272a4",
      "editorIndentGuide.background": "#44475a",
      "editor.selectionBackground": "#44475a88",
      "editor.inactiveSelectionBackground": "#44475a55",
    },
  },
  "catppuccin-latte": {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "9893a5" },
      { token: "string", foreground: "dd7878" },
      { token: "keyword", foreground: "d20f39" },
      { token: "number", foreground: "ea76cb" },
      { token: "type", foreground: "8839ef" },
      { token: "class", foreground: "4c4f69" },
      { token: "function", foreground: "4c4f69" },
      { token: "variable", foreground: "179299" },
      { token: "operator", foreground: "d20f39" },
    ],
    colors: {
      "editor.background": "#eff1f5",
      "editor.foreground": "#4c4f69",
      "editor.lineHighlightBackground": "#e6e9ef",
      "editorLineNumber.foreground": "#6c6f85",
      "editorIndentGuide.background": "#ccd0da",
      "editor.selectionBackground": "#dce0e88a",
      "editor.inactiveSelectionBackground": "#dce0e855",
    },
  },
  "catppuccin-frappe": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "9295a0" },
      { token: "string", foreground: "f2cdcd" },
      { token: "keyword", foreground: "eebebe" },
      { token: "number", foreground: "c6a0f6" },
      { token: "type", foreground: "8caaee" },
      { token: "class", foreground: "f4b8e4" },
      { token: "function", foreground: "f4b8e4" },
      { token: "variable", foreground: "8caaee" },
      { token: "operator", foreground: "eebebe" },
    ],
    colors: {
      "editor.background": "#303446",
      "editor.foreground": "#c6d0f5",
      "editor.lineHighlightBackground": "#3e4556",
      "editorLineNumber.foreground": "#6c6f85",
      "editorIndentGuide.background": "#3e4556",
      "editor.selectionBackground": "#3e455688",
      "editor.inactiveSelectionBackground": "#3e455655",
    },
  },
  "catppuccin-macchiato": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "939ab7" },
      { token: "string", foreground: "b8dceb" },
      { token: "keyword", foreground: "ed8796" },
      { token: "number", foreground: "c6a0f6" },
      { token: "type", foreground: "8aadf4" },
      { token: "class", foreground: "f5bde6" },
      { token: "function", foreground: "f5bde6" },
      { token: "variable", foreground: "a6adc8" },
      { token: "operator", foreground: "ed8796" },
    ],
    colors: {
      "editor.background": "#1e2030",
      "editor.foreground": "#cad3f5",
      "editor.lineHighlightBackground": "#24273a",
      "editorLineNumber.foreground": "#6e738d",
      "editorIndentGuide.background": "#363a4f",
      "editor.selectionBackground": "#494d64aa",
      "editor.inactiveSelectionBackground": "#494d6466",
    },
  },
  "catppuccin-mocha": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6c7086" },
      { token: "string", foreground: "a6e3a1" },
      { token: "keyword", foreground: "f38ba8" },
      { token: "number", foreground: "cba6f7" },
      { token: "type", foreground: "89b4fa" },
      { token: "class", foreground: "f5e0dc" },
      { token: "function", foreground: "f5e0dc" },
      { token: "variable", foreground: "a6adc8" },
      { token: "operator", foreground: "f38ba8" },
    ],
    colors: {
      "editor.background": "#1e1e2e",
      "editor.foreground": "#cdd6f4",
      "editor.lineHighlightBackground": "#313244",
      "editorLineNumber.foreground": "#6c7086",
      "editorIndentGuide.background": "#45475a",
      "editor.selectionBackground": "#585b70aa",
      "editor.inactiveSelectionBackground": "#585b7066",
    },
  },
}

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITIONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    })
  })
}
