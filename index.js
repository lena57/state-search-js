const search = document.getElementById("search-input")
const matchList = document.getElementById("match-list")


//search and filter from states.json
const statesFromSearch = async(textInput)=>{
  const res = await fetch("./data/states.json")
  const data = await res.json()
  //console.log('data', data)

  //get matches to the text input
  let matches = data.filter((state)=>{
    const regex = new RegExp(`^${textInput}`, "gi")
    return state.name.match(regex) || state.capital.match(regex)
  })
  if(textInput.length===0){
    matches=[]
    matchList.innerHTML=""
  }
  console.log('matches', matches)

  outputHtml(matches)
}

//html functon for matches
const outputHtml=(matches)=>{
  if(matches.length){
    const html = matches.map((state)=>
      `
      <div class="card card-body">
        <h4>${state.name} (${state.abbr}) <span class="text-success">${state.capital}</span></h4>
        <small>lat: ${state.lat} / long: ${state.long}</small>
      </div>
      `
    ).join('')

    console.log('html', html)
    matchList.innerHTML = html
  }
}

search.addEventListener("input", ()=>{
  statesFromSearch(search.value)
})