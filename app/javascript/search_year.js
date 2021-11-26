export function searchYear (era) {
  const url = '/api/maps/searche_year'
  const data = { era: era }
  const queryParams = new URLSearchParams(data)
  return fetch(`${url}?` + queryParams) // eslint-disable-line
    .then(response => response.json())
}
