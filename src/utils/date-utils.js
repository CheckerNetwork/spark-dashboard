export function todayInFormat() {
  const currentDate = new Date(Date.now())
  return currentDate.toISOString().split('T')[0]
}

export function getDateXDaysAgo(x) {
  const date = new Date()
  date.setDate(date.getDate() - x)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
