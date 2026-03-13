#!/bin/bash
# Simple validation script to check if TypeScript files are syntactically valid

echo "=== Validating TypeScript Syntax ==="
echo ""

FILES=(
  "app/lib/env-validation.client.ts"
  "app/lib/stores/provider-availability.ts"
  "app/lib/.server/llm/provider-availability.ts"
  "app/lib/.server/llm/model-config.ts"
  "app/lib/stores/model.ts"
  "app/components/chat/ModelSelector.tsx"
  "app/components/chat/Chat.client.tsx"
  "app/routes/api.chat.ts"
)

ERRORS=0

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "✓ $FILE exists"

    # Basic syntax check - look for common issues
    if grep -q "import.*from.*'[^']*';$" "$FILE"; then
      echo "  ✓ Has valid imports"
    fi

    # Check for balanced braces (simple check)
    OPEN=$(grep -o "{" "$FILE" | wc -l)
    CLOSE=$(grep -o "}" "$FILE" | wc -l)
    if [ "$OPEN" -eq "$CLOSE" ]; then
      echo "  ✓ Balanced braces ($OPEN opening, $CLOSE closing)"
    else
      echo "  ✗ Unbalanced braces ($OPEN opening, $CLOSE closing)"
      ERRORS=$((ERRORS + 1))
    fi

    # Check for balanced parentheses
    OPEN=$(grep -o "(" "$FILE" | wc -l)
    CLOSE=$(grep -o ")" "$FILE" | wc -l)
    if [ "$OPEN" -eq "$CLOSE" ]; then
      echo "  ✓ Balanced parentheses"
    else
      echo "  ✗ Unbalanced parentheses ($OPEN opening, $CLOSE closing)"
      ERRORS=$((ERRORS + 1))
    fi

  else
    echo "✗ $FILE not found"
    ERRORS=$((ERRORS + 1))
  fi
  echo ""
done

echo "=== Summary ==="
if [ $ERRORS -eq 0 ]; then
  echo "✓ All files passed basic validation"
  echo ""
  echo "Next steps:"
  echo "1. Run 'pnpm install' to install dependencies"
  echo "2. Run 'pnpm run build' to build the project"
  echo "3. Fix any TypeScript errors that appear"
  echo "4. Run 'pnpm run dev' to test locally"
  exit 0
else
  echo "✗ Found $ERRORS error(s)"
  echo "Please review the files above"
  exit 1
fi
