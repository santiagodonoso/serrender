function cl(text){console.log(text)}

// let html = document.getElementsByTagName("html")[0]
// html = html.outerHTML
history.replaceState({"xonurl":"/"}, "title", "/")

async function x(entry=false){
    
    if(!entry){
        // console.log("info x(entry) not given. Using the element itself")
        entry = event.target
    }
    // console.log(`info x(entry): ${entry}`)

    const xurl = entry.dataset.xurl
    if( ! xurl ){console.log(`error : x() xurl missing`); return}    
    // console.log(`ok : x() xurl to fetch data is '${url}'`)
    
    // If element/s in dom, then show it. Else fetch them
    if( document.querySelector(`[data-xOnUrl="${xurl}"]`) ){
        cl("SPA already loaded, showing elements")
        xonurl(xurl)
        return
    }


    const methods_allowed = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    let method = entry.dataset.xmethod
    if( ! method ){console.log(`error : x() xMethod missing`); return}     
    method = method.toUpperCase() 
    if( ! methods_allowed.includes(method) ){
        console.log(`error : x() method '${method}' not allowed`); return
    }
    // console.log(`ok : x() method to fetch data is ${method}`)




    const conn = await fetch(xurl, {
        method : method
    })
    const res = await conn.text()
    // console.log(`inserting res in the dom`)
    document.querySelector("body").insertAdjacentHTML('beforeend', res)

    let actual_html = ""
    let new_url = false
    document.querySelectorAll('template[data-xTarget]').forEach(template => {
        // console.log("template", template)  

        if( template.dataset.xnewurl && new_url == false ){
            new_url = template.dataset.xnewurl
        }
        // cl(`new_url: ${new_url}`)

        const target = template.dataset.xtarget
        if( ! target ){console.log(`error : x() xTarget missing`); return}    
        // console.log(`ok : x() the response data will affect '${target}'`)
        if(! document.querySelector(target) ){console.log(`error : x() xTarget is not in the dom`); return}   

        const position = template.dataset.xposition || "replace"
        // console.log(`ok : x() position is '${position}'`)
        if( ! ["replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
            console.log(`error : x() xPosition '${position}' is not valid`); return
        }

        const title = template.dataset.xtitle || false
        // console.log(`ok : x() the xTitle is '${title}'`)
        if(title){ document.title = title}          

        const temp_html = document.querySelector(target).outerHTML
        actual_html += `<template class="x" data-xTarget="${target}">${temp_html}</template>`


        if(position == "replace"){            
            document.querySelector(target).insertAdjacentHTML("afterend", template.innerHTML)
            document.querySelector(target).remove()
        }else{
            document.querySelector(target).insertAdjacentHTML(position, template.innerHTML)
        }

        // const xonurl = template.dataset.xonurl
        // cl(xonurl)
        template.remove()

        // Process newly injected elements
        xonurl(xurl)

    })

    if( new_url ){ // push to history
        cl("Pushing to history")
        // cl(actual_html)
        history.pushState({"xonurl":new_url}, "", new_url)
    }

    // if( spa_url ) {
    //     // cl(document.body.outerHTML)
    //     let html = document.getElementsByTagName("html")[0]
    //     html = html.outerHTML
    //     // cl(html)
    //     history.pushState({"html":html}, "", spa_url)
    // }    

}


// ##############################
function xonurl(xurl){
    cl(`xonurl(xurl): ${xurl}`)
    document.querySelectorAll(`[data-xonurl='${xurl}']`).forEach( el => {
        if(el.dataset.xhide){
            document.querySelectorAll(el.dataset.xhide).forEach( i => {
                i.classList.add("hidden")
            })
        }
        if(el.dataset.xshow){
            document.querySelectorAll(`[data-xshow='${el.dataset.xshow}']`).forEach( i => {
                i.classList.remove("hidden")
            })
        }            
    })
}

// ##############################
window.onpopstate = function(event){
    // let temp = document.getElementsByTagName("html")[0]
    // cl(event.state.html)
    // temp.innerHTML = event.state.html
    cl(event.state.xonurl)
    xonurl(event.state.xonurl)
}