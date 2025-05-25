type ErrorMessages = {
  invalidCreds: string
}

const errorMap: Record<string, keyof ErrorMessages> = {
  'Invalid credentials': 'invalidCreds',
}

export const mapServerError = (message: string): keyof ErrorMessages | null => {
  return errorMap[message] || null
}
