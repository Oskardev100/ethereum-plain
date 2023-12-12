if you get the error "SyntaxError: Cannot use import statement outside a module", you need to add:
    "type": "module",
before list of dependencies on the package.json

