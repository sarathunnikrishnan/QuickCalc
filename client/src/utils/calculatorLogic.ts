export const evaluateExpression = (expression: string): string => {
  try {
    // Replace visual operators with JS operators
    let sanitizedExpr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');
    
    // Handle percentages: convert "X%" to "(X/100)"
    sanitizedExpr = sanitizedExpr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    
    // If a number directly follows a percentage (e.g. "100%25" -> "(100/100)25"), insert multiplication
    sanitizedExpr = sanitizedExpr.replace(/\)(\d)/g, ')*$1');
    
    // Prevent evaluating empty or purely operator strings
    if (!sanitizedExpr || /^[*/+\-]+$/.test(sanitizedExpr)) {
      return '';
    }

    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitizedExpr}`)();
    
    // Handle floating point precision issues (e.g. 0.1 + 0.2)
    if (!isFinite(result)) {
      return 'Error';
    }
    
    // Round to 8 decimal places max to avoid weird JS math errors
    return String(Math.round(result * 100000000) / 100000000);
  } catch (error) {
    return 'Error';
  }
};
