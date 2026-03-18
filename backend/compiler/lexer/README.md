# 🧠 Lexer Module

## 📌 Overview
The **Lexer (Lexical Analyzer)** is the first phase of a compiler. It scans the source code and converts it into a sequence of **tokens** that are later used by the parser.

---

## 🚀 Features
- DFA-based tokenization
- Supports keywords, identifiers, numbers, and strings
- Handles relational and arithmetic operators
- Tracks line numbers
- Modular and easy to extend

---

## 📂 Project Structure
lexer/  
│── lexer.py  
│── token.py  
│── token_types.py  
│── symbol_table.py  
│── lexer_rules.py

---

## 🔧 How It Works

### Step-by-Step Process
1. Read source code input
2. Scan character by character
3. Follow DFA (Deterministic Finite Automaton) transitions
4. Form lexemes
5. Generate tokens
6. Repeat until End of File (EOF)

---

## 🔤 Supported Tokens

| Type        | Examples                  |Returned Token|
|------------|--------------------------|--
| Keyword     | if, else, let ,while                 |Token("keyword" ,"if" ,line_number)
| Identifier  | x, var1                  |Token("IDENTIFIER" ,"var1" ,line_number)
| Number      | 123                      |Token("number" ,"123" ,line_number)
| String      | "hello"                  |Token("string" ," "hello" "  ,line_number)
| Relational  | <, >, <=, >=, ==, <>     |Token("relop" ,"==" ,line_number)
| Arithmetic  | +, -, *, /, %, ++, --    |Token("arop" ,"+" ,line_number)
| Assignment  | =                        |Token("assig" ,"=" ,line_number)
| Symbols     | { } ( ) ; ,              |Token("symbol" ,"{" ,line_number)
| EOF         | End of file              |Token("EOF" ,"EOF" ,line_number)

---


---

## 🔄 State Diagram (Simplified)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZEsJYqnbyI6HlMLrx9GNVhETYrgXIh4J8y0PEwGv_CgSlITkQigpTkvaXjGl9Mzt0beNmQ08e9m0mQCBpm1BUgSbsR0l6u8Pu73ZzRFOHMw42m7sEq5B-_2PtpFYYRmCjrpLI1099FQE/s1600/Untitled.png)

Final states return tokens


---

## 💻 Usage Example

```python
from lexer import Lexer

code = """
let x = 10;
if x > 5 {
    x++;
}
"""

lexer = Lexer(code)

while True:
    token = lexer.next_token()
    print(token)

    if token.type == "EOF":
        break
 ```
---

## 📌 Example Output

Token(keyword, let)
Token(IDENTIFIER, x)
Token(assig, =)
Token(number, 10)
Token(symbol, ;)
Token(keyword, if)
Token(IDENTIFIER, x)
Token(relop, >)
Token(number, 5)
Token(symbol, {)
Token(IDENTIFIER, x)
Token(arop, ++)
Token(symbol, ;)
Token(symbol, })

## ⚠️ Known Issues

-   Column tracking is not fully implemented
    
-   No support for comments (`//`, `/* */`)
    
-   Floating-point numbers are not supported
    
-   Basic error handling
## 🔮 Future Improvements

-   Add comment handling
    
-   Support floating-point numbers
    
-   Improve error reporting with line & column
    
-   Integrate symbol table fully
    
-   Add token position tracking

## 🧩 Lexer Architecture Diagram

![App Screenshot](backend\compiler\lexer\Source_Code_Tokenization.png)




## 📌 Summary

The lexer is responsible for breaking input code into meaningful tokens using a DFA-based approach. It serves as the foundation for further phases like parsing and semantic analysis.

  
---  
  

