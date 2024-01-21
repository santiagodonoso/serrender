history.replaceState({"url_to_load":replace_state_url}, "title", replace_state_url)
pages_not_found = []

// ##############################
async function load(url_to_load, push_to_history = true){
    if(url_to_load === undefined){
      url_to_load = event.target.getAttribute("data-load-page-id")
    }
    console.log("url_to_load", url_to_load)
    // try{
        //   page_id = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-load-page-id")
        //   console.log("page_id", page_id)
        // }catch(ex){
            //   // alert()
            // }

    // if page is already loaded
    if( document.getElementById(`${url_to_load}`) ){
        console.log("page already loaded")
        document.getElementById(`${url_to_load}`).setAttribute("is_shown")
        document.getElementById(`${url_to_load}`).setAttribute("data-die-at", clock+5)
        document.querySelector("#item_modal").classList.add("spa_show")
        set_url(url_to_load, push_to_history)
        return
    }

    console.log("page not loaded. Proceed to load url: ", url_to_load)

    let conn = await fetch(url_to_load+'?spa=yes')
    let res = await conn.text()
    // console.log(res)
    // document.getElementById("page_loading").style.width = "0px"
    // const show_inside = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-show-inside")
    document.querySelector("#item_container").insertAdjacentHTML("afterbegin", res)
    // document.getElementById("pages").insertAdjacentHTML("beforeend", res)
    document.getElementById(`${url_to_load}`).classList.add("is_shown")
    document.getElementById(`${url_to_load}`).setAttribute("data-die-at", clock+5)
    document.querySelector("#item_modal").classList.add("spa_show")
    
    // try{
    //   document.getElementById(`${page_id}`).classList.add("spa_show")
    //   document.getElementById(`${page_id}`).setAttribute("data-die-at", clock+30)
    //   // document.querySelector('#'+page_id.replace(/\//g, '\\/')).classList.add("spa_show")
    // }catch(ex){
    //   pages_not_found.push(page_id)
    //   document.getElementById(`page_not_found`).classList.remove("spa_hide")
    //   document.getElementById(`page_not_found`).classList.add("spa_show")
    // }
    set_url(url_to_load, push_to_history)
    return
  }
  



// ##############################
function set_url(url_to_load, push_to_history){ 
    if(push_to_history){
        history.pushState({"url_to_load":url_to_load}, "", url_to_load)
    }
}

// ##############################
var clock = 0
setInterval(function(){
    let pages = document.querySelectorAll("[data-die-at]")
    console.log(pages)
    pages.forEach(page=>{
    let is_page_shown = page.classList.contains("is_shown") ? true : false
    console.log("is_page_shown", is_page_shown)

    if(page.getAttribute("data-die-at") < clock && !is_page_shown ){
        console.log("removing page")
        page.remove()
    }else{
        // page.setAttribute("data-die-at", clock + 10)
    }
    })
    clock++
    console.log(clock)
}, 1000)