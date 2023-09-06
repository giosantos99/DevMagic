import formatNumber from './formatNumber.js'

const fetchHits = async () => {
  const tabela = document.querySelector('.tabela-container')
  const totalHits = document.querySelector('.text-total-hits')

  const fetcher = await fetch('./json/urls.json')

  const response = await fetcher.json()

  const urlSorted = response
                        .slice(0, 5)
                        .sort((a, b) => a.hits > b.hits ? -1 : 1)

  const sumTotalHits = urlSorted.reduce((acc, { hits }) => acc + hits, 0)
  totalHits.innerText = formatNumber(sumTotalHits)

  urlSorted.filter(({ hits, url }) => {
    const container = document.createElement('div')
    const link = document.createElement('div')
    const hit = document.createElement('div')

    container.classList.add('tabela-container-hits')
    link.classList.add('text-red', 'font-weight-bold', 'd-inline-block', 'text-truncate')
    hit.classList.add('text-grey')

    link.innerText = url
    hit.innerText = formatNumber(hits)

    container.appendChild(link)
    container.appendChild(hit)
    
    tabela.appendChild(container)
  })
}

export default fetchHits