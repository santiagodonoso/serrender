function cl(text){console.log(text)}

let html = document.getElementsByTagName("html")[0]
html = html.outerHTML
history.replaceState({"html":html}, "title", "/")

async function serrender(entry=false){

    if(!entry){
        console.log("info serrender(entry) not given. Using the element itself")
        entry = event.target
    }
    // console.log(`info serrender(entry): ${entry}`)

    const methods_allowed = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    let method = entry.dataset.srmethod
    if( ! method ){console.log(`error : serrender() srMethod missing`); return}     
    method = method.toUpperCase() 
    if( ! methods_allowed.includes(method) ){
        console.log(`error : serrender() method '${method}' not allowed`); return
    }
    // console.log(`ok : serrender() method to fetch data is ${method}`)

    const url = entry.dataset.srurl
    if( ! url ){console.log(`error : serrender() url missing`); return}    
    // console.log(`ok : serrender() url to fetch data is '${url}'`)


    const conn = await fetch(url, {
        method : method
    })
    const res = await conn.text()
    // console.log(`inserting res in the dom`)
    document.querySelector("body").insertAdjacentHTML('beforeend', res)
    
    let spa_url = false
    document.querySelectorAll('.serrender').forEach(el => {
        // console.log(el)  

        const spa = el.dataset.srspa
        if( spa ) {
            spa_url = spa
        }

        const target = el.dataset.srtarget
        if( ! target ){console.log(`error : serrender() srTarget missing`); return}    
        // console.log(`ok : serrender() the response data will affect '${target}'`)
        if(! document.querySelector(target) ){console.log(`error : serrender() srTarget is not in the dom`); return}   

        const position = el.dataset.srposition || "replace"
        // console.log(`ok : serrender() position is '${position}'`)
        if( ! ["replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
            console.log(`error : serrender() srPosition '${position}' is not valid`); return
        }

        const title = el.dataset.srtitle || false
        // console.log(`ok : serrender() the srTitle is '${title}'`)
        if(title){ document.title = title}          

        if(position == "replace"){
            document.querySelector(target).insertAdjacentHTML("afterend", el.innerHTML)
            document.querySelector(target).remove()
        }else{
            document.querySelector(target).insertAdjacentHTML(position, el.innerHTML)
        }
        el.remove()
    })

    if( spa_url ) {
        // cl(document.body.outerHTML)
        let html = document.getElementsByTagName("html")[0]
        html = html.outerHTML
        // cl(html)
        history.pushState({"html":html}, "", spa_url)
    }    

}


// ##############################
window.onpopstate = function(event){
    // cl(event.state.html)
    // history.pushState({"dom":event.state.dom}, "", "/test")
    // document.body.innerHTML = event.state.html
    let temp = document.getElementsByTagName("html")[0]
    cl(event.state.html)
    temp.innerHTML = event.state.html
  }