const axios = require('axios')





const getWikipediaQuery = async (query) => {
    let url = `https://es.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=${query}`;
    let r_title = null;
    await axios.get(url).then((response) => {
      
    let data = response.data.query.pages
    console.log(data)
    let buffer = Object.keys(data)
    console.log(buffer[0])

    
    console.log(`data.${String(buffer[0])}`)

    let title = eval(`data[${String(buffer[0])}].title`)
    
    return title

    
  
}).then((titl) => {
    r_title = titl
    console.log(r_title)
})

    return r_title
}

const getWikipediaPage = async (page) => {
    try {
    let title = await getWikipediaQuery(page)
    title = encodeURI(title)

    let text = null;
    
    const url = `https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}`

    console.log(url)
    await axios.get(url).then((response) => {
        console.log(response.data.query)
        let object = Object.keys(response.data.query.pages)
        let data = eval(`response.data.query.pages['${object[0]}'].extract`)
        //console.log(data)

        return data

    }).then((dat) => {
        text = dat
    })
    
   
    return text
}
catch {
    return "Lo sentimos! no encontramos ninguna pagina precisa"
}
}



module.exports = getWikipediaPage
