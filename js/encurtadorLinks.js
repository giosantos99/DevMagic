const OnEncurtar = async () => {
  try {
    const urlInput = document.getElementById('url')

    urlInput.style.color = '#fff'

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: urlInput.value })
    };
    
    const response = await fetch('https://dr-api.encurtador.dev/encurtamentos', options)
    
    const { urlEncurtada } = await response.json()

    urlInput.value = urlEncurtada
  } catch (error)  {
    console.log(Error(error))

    OnNotify('alert-danger', 'Erro ao encurtar o link, tente novamente !')
  }
}

const OnCopiar = () => {
  const texto = document.getElementById('url')

  navigator.clipboard.writeText(texto.value)
}

const OnNotify = (background, text) => {
  const notify = document.querySelector('.alert')

  notify.classList.remove('alert-danger', 'alert-success')
  
  notify.innerText = text
  notify.classList.add(background)
  notify.classList.remove('d-none')

  setTimeout(() => notify.classList.add('d-none'), 4000)
}

export const closeBtn = () => {
  const btn = document.querySelector('a')

  const clickFn = () => {
    const url = document.getElementById('url')

    btn.classList.add('d-none')

    url.value = ''
  }

  btn.addEventListener('click', clickFn)
}


export const ChangeUrl = () => {
  const url = document.getElementById('url')
  const closeBtn = document.querySelector('a')

  const keyupFn = () => {
    const hasUrl = url.value.length
    
    hasUrl
      ? closeBtn.classList.remove('d-none')
      : closeBtn.classList.add('d-none')
  }
  url.addEventListener('keyup', keyupFn)
}


export const HandleUrl = () => {
  const btn = document.querySelector('.btn-encurtar')

  const clickFn = () => {
    const url = document.getElementById('url').value
    const hasUrl = !url.length
    const pattern = /^https:\/\//i
    const urlEdit = url.slice(0, 4)
    const isUrl = urlEdit === 'http'
    const btnValue = btn.innerText.toLowerCase()

    if (hasUrl) {
      OnNotify('alert-danger', 'Informe um link para ser encurtado !')

      return
    }

    if (btnValue === 'encurtar' && !pattern.test(url)) {
      OnNotify('alert-danger', 'Informe um link válido para ser encurtado !')

      return
    }
    
    btn.innerText = !isUrl ? 'Encurtar' : 'Copiar' 

    const hasEncurtarNotify = !isUrl ? 'copiado' : 'encurtado'
    
    isUrl ? OnEncurtar() : OnCopiar()

    OnNotify('alert-success', `Link ${hasEncurtarNotify} com sucesso !`)
  }
  btn.addEventListener('click', clickFn)
}
