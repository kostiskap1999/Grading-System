export function isFirstCharacterBracket(str: string) {
    let trimmedStr = str.trim(); // Removing leading and trailing whitespaces
    if (trimmedStr.length > 0 && (trimmedStr[0] === '{' || trimmedStr[0] === '[')) {
      return true
    } else {
      return false
    }
  }

  export function isValidJSONOrArray(str: string) {
  try {
    let parsed = JSON.parse(str);

    if (Array.isArray(parsed) || (typeof parsed === 'object' && parsed !== null)) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}