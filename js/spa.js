history.replaceState({"url_to_load":replace_state_url}, "title", replace_state_url)

// ##############################
async function load(url_to_load, push_to_history = true){
  console.log(event.target.parentElement)
  if(url_to_load === undefined){
    url_to_load = event.target.getAttribute("href")
  }
  console.log("url_to_load", url_to_load)
  try{
    page_id = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-load-page-id")
    console.log("page_id", page_id)
  }catch(ex){
    
  }
  
  if( document.getElementById(`${page_id}`) ){
    console.log("page already loaded")
    if(document.getElementById(`${page_id}`).classList.contains("page")){
      document.getElementById(`${page_id}`).setAttribute("data-die-at", clock+30)
    }

    console.log("seeting url")
    set_url(url_to_load, push_to_history)
    hide_show(url_to_load)
    return
  }
  

  
  try{
    let conn = await fetch(url_to_load+'?spa=yes')
    // console.log(url_to_load+'?spa=yes')
    let res = await conn.text()
    if(! conn.ok){
      toast(false, "page not found")
      return
    }
    // console.log(res)
    // document.getElementById("page_loading").style.width = "0px"
    const show_inside = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-show-inside")
    if(show_inside){
      document.querySelector(show_inside).insertAdjacentHTML("beforeend", res)
    }
    // document.getElementById("pages").insertAdjacentHTML("beforeend", res)    
    document.getElementById(`${page_id}`).classList.add("spa_show")
    document.getElementById(`${page_id}`).setAttribute("data-die-at", clock+30)

    // document.querySelector('#'+page_id.replace(/\//g, '\\/')).classList.add("spa_show")
  }catch(ex){
    toast(false, "page not found")
    return
  }
  hide_show(url_to_load)
  set_url(url_to_load, push_to_history)
  return
}

// ##############################
window.onpopstate = function(event){
  load(event.state.url_to_load, false)
}

// ##############################
function set_url(url_to_load, push_to_history){ 
  document.querySelectorAll(".spa_active").forEach( el => el.classList.remove("spa_active") )
  document.querySelectorAll(`[href='${url_to_load}']`).forEach( el => el.classList.add("spa_active") )
  if(push_to_history){
    history.pushState({"url_to_load":url_to_load}, "", url_to_load)
  }
}

// ##############################
function hide_show(url_to_load){
  try{
    hide_elements_csv = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-hide") 
    console.log("hide_elements_csv", hide_elements_csv)
    hide_elements_list = hide_elements_csv.split(",")
    hide_elements_list.forEach( q => { // .page #something
      document.querySelectorAll(q).forEach( el => {
        el.classList.remove("spa_show")
        el.classList.add("spa_hide")
      })
    })
  }catch(ex){
    // console.log(ex)
  }
  
  try{
    show_elements_csv = document.querySelector(`[href='${url_to_load}']`).getAttribute("data-show") 
    console.log("show_elements_csv", show_elements_csv)
    show_elements_list = show_elements_csv.split(",")
    show_elements_list.forEach( q => { 
      // document.querySelectorAll('#employee\\/1').forEach( el => {
      document.querySelectorAll(q.replace(/\//g, '\\/')).forEach( el => {
        el.classList.remove("spa_hide")
        el.classList.add("spa_show")
      })
    })  
  }catch(ex){
    document.querySelectorAll(".page").forEach( o => { 
      o.classList.remove("spa_show")
      o.classList.add("spa_hide")
    })
    try{
      document.querySelector("#page_not_found").classList.remove("spa_hide")
      document.querySelector("#page_not_found").classList.add("spa_show")
    }catch(ex){}
  }
}



// ##############################
var clock = 0
setInterval(function(){
  let pages = document.querySelectorAll("[data-die-at]")
  // console.log(pages)
  pages.forEach(page=>{
    // console.log("page", page)
    let is_page_shown = page.classList.contains("spa_show") ? true : false
    // console.log("is_page_shown", is_page_shown)
    // console.log("clock", clock)
    // console.log("data-die-at", page.getAttribute("data-die-at"))
    if(page.getAttribute("data-die-at") == "0"){
      return
    }
    if(is_page_shown == false){
      if(page.getAttribute("data-die-at") < clock){
        page.remove()
      }
    }else{
      page.setAttribute("data-die-at", clock + 10)
    }
  })
  clock++
  // console.log(clock)
}, 1000)