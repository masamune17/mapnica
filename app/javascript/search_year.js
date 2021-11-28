export function searchYear (year) {
  const url = '/api/maps/searche_year'
  const data = { year: year }
  const queryParams = new URLSearchParams(data)
  return fetch(`${url}?` + queryParams) // eslint-disable-line
    .then(response => response.json())
}
