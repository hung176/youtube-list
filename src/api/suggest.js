const fetch = require('node-fetch')

export const suggest = (term) => {
  return (fetch(`https://clients1.google.com/complete/search?client=youtube&hl=en&gl=sg&gs_rn=64&gs_ri=youtube&tok=h3yTGb1h3-yuCBwsAaQpxQ&ds=yt&cp=3&gs_id=2u&q=${term}&callback=google.sbox.p50&gs_gbg=0l0MjG05RWnWBe9WcipQbsy`, { mode: 'no-cors' })
    .then(res => {
      return res.text()
    })
    .then(data => {
      const searchSuggestions = []
      data.split('[').forEach((ele, index) => {
        if (!ele.split('"')[1] || index === 1) return
        return searchSuggestions.push(ele.split('"')[1])
      })
      return searchSuggestions
    })
  )
}
