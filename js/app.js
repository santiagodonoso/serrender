function _(q){return document.querySelector(q)}
function __(q){return document.querySelectorAll(q)}
function cl(text){ console.log(text) }

async function ___(instructor = false, callback = false){

    if( ! instructor ){ cl("error : ___(instructions) argument missing"); return }
    if( ! callback ){ cl("optional : ___(callback) argument") }    

    const attx = _(instructor)
    if( ! attx ){cl("error : ___() attx not in the document"); return}

    const methods_allowed = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    let method = attx.dataset.xmethod
    if( ! method ){cl(`error : ___() xMethod missing`); return}     
    method = method.toUpperCase() 
    if( ! methods_allowed.includes(method) ){
        cl(`error : ___() method '${method}' not allowed`); return
    }
    cl(`ok : ___() method to fetch data is ${method}`)
    

    const url = attx.dataset.xurl
    if( ! url ){cl(`error : ___() url missing`); return}    
    cl(`ok : ___() url to fetch data is '${url}'`)


    let frm_data = null
    if( method == "POST" || method == "PUT" || method == "PATCH" ){
        const data_source = attx.dataset.xdatasource
        if( ! data_source ){cl(`error : ___() xDataSource missing`); return}    
        cl(`ok : ___() data to send to the server is in '${data_source}'`)
        frm_data = _(data_source)
        if( ! frm_data ){cl(`error : ___() xDataSource is not in the dom`); return}
    }


    const target = attx.dataset.xtarget
    if( ! target ){cl(`error : ___() xTarget missing`); return}    
    cl(`ok : ___() the response data will affect '${target}'`)
    if(! _(target) ){cl(`error : ___() xTarget is not in the dom`); return}    


    const position = attx.dataset.xposition
    if( ! position ){cl(`error : ___() xPosition missing`); return}    
    cl(`ok : ___() position is '${position}'`)
    if( ! ["replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){cl(`error : ___() xPosition is not valid`); return}


    const response_key = attx.dataset.xresponsekey || "*"
    if( response_key == "*" ){
        cl(`optional : ___() xResponseKey. Default is to use the whole response`)
    }else{
        cl(`optional : ___() xResponseKey. Using the whole response`)
    }    
    cl(`ok : ___() the response optional key is '${response_key}'`)


    const show_toast = attx.dataset.xshowtoast || false
    if( ! show_toast ){cl(`optional : ___() xShowToast. Default is no`)}    
    cl(`ok : ___() the xShowToast optional key is '${show_toast}'`)
    const show_ok_toast = attx.dataset.xshowoktoast || false
    if( ! show_ok_toast ){cl(`optional : ___() xShowOkToast. Default is no`)}    
    cl(`ok : ___() the xShowOkToast optional key is '${show_ok_toast}'`)
    const show_error_toast = attx.dataset.xshowerrortoast || false
    if( ! show_error_toast ){cl(`optional : ___() xShowErrorToast. Default is no`)}    
    cl(`ok : ___() the xShowErrorToast optional key is '${show_error_toast}'`)    



    let conn = null 
    if( method == "GET" || method == "DELETE" ){
        cl(`ok : ___() connecting using method '${method}'`)
        conn = await fetch(url, {
            method : method
        })
    }
    if( method == "POST" || method == "PUT" || method == "PATCH"){
        conn = await fetch(url, {
            method : method,
            body : new FormData(frm_data)
        })
    }   

    // Expecting JSON with keys
    let res = null
    if( response_key != "*" ){
        res = await conn.json()
        if(position == "replace"){
            _(target).insertAdjacentHTML("afterend", res[response_key])
            _(target).remove()
        }else{
            _(target).insertAdjacentHTML(position, res[response_key])
        }               
    }else{
        res = await conn.text()
        if(position == "replace"){
            _(target).insertAdjacentHTML("afterend", res)
            _(target).remove()
        }else{
            _(target).insertAdjacentHTML(position, res)
        }                
    }


    // const res = obj.is_res_json ? await conn.json() : await conn.text()
    if( ! conn.ok && (show_error_toast || show_toast) ){
        _("#toast_error").classList.remove("hidden")
        _("#toast_error").classList.add("flex")
        _("#toast_error").innerHTML = res
        setTimeout(function(){
            _("#toast_error").classList.remove("flex")            
            _("#toast_error").classList.add("hidden")
        }, 2000)
        return
    }
    if( conn.ok && (show_ok_toast || show_toast) ){
        _("#toast_ok").classList.remove("hidden")
        _("#toast_ok").classList.add("flex")
        _("#toast_ok").innerHTML = res
        setTimeout(function(){
            _("#toast_ok").classList.remove("flex")            
            _("#toast_ok").classList.add("hidden")
        }, 2000)
    }    

    // xNext
    const next = attx.dataset.xnext
    if( ! next ){cl(`optional : ___() xNext optional and it is not present`); return}    
    cl(`ok : ___() xNext points to '${next}'`)
    if(! _(next) ){cl(`error : ___() xNext not in the dom`); return}    
    ___next(next, res)

}


function ___next(instructor, res){
    if( ! instructor ){ cl("error : ___next(instructor) argument missing"); return }
    const attx = _(instructor)
    if( ! attx ){cl("error : ___next() attx not in the document"); return}


    const response_key = attx.dataset.xresponsekey || "*"
    if( response_key == "*" ){
        cl(`optional : ___next() xResponseKey. Default is to use the whole response`)
    }else{
        cl(`optional : ___next() xResponseKey. Using the key '${response_key}'`)
    }    
    cl(`ok : ___next() the response optional key is '${response_key}'`)    
   
    
    const target = attx.dataset.xtarget
    if( ! target ){cl(`error : ___next() xTarget missing`); return}    
    cl(`ok : ___next() the response data will affect '${target}'`)
    if(! _(target) ){cl(`error : ___next() xTarget is not in the dom`); return}    

    
    const position = attx.dataset.xposition
    if( ! position ){cl(`error : ___next() xPosition missing`); return}    
    cl(`ok : ___next() position is '${position}'`)
    if( ! ["replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
        cl(`error : ___next() xPosition is not valid`); return
    }
    
    const next = attx.dataset.xnext
    if( ! next ){cl(`optional : ___() xNext optional and it is not present`)}    
    if( next) {
        cl(`ok : ___() xNext points to '${next}'`)
        if(! _(next) ){cl(`error : ___() xNext not in the dom`); return}  
    }
    

    if(position == "replace"){
        _(target).insertAdjacentHTML("afterend", res[response_key])
        _(target).remove()
    }else{
        _(target).insertAdjacentHTML(position, res[response_key])
    }


    ___next(next, res)
}

// url, method | form_id | is_res_json | show_error_toast | show_ok_toast |callback
// async function ___(obj){
//     if(! obj){ cl("___() object missing"); return }
//     if(! obj.url){ cl("___() object.url missing"); return }
//     if(! obj.method){ cl("___() object.url missing, defaulting to GET"); obj.method = "GET" }   
//     if(! obj.show_toast){ cl("___() object.show_toast missing, defaulting to false"); obj.show_toast = false }   
//     if(! obj.show_error_toast){ cl("___() object.show_error_toast missing, defaulting to false"); obj.show_error_toast = false }   
//     if(! obj.show_ok_toast){ cl("___() object.show_ok_toast missing, defaulting to false"); obj.show_ok_toast = false }   
//     let conn = null 
//     if( obj.method.toLowerCase() == "get" || obj.method.toLowerCase() == "delete"){
//         cl(`___() connecting using method ${obj.method.toUpperCase()}`)
//         conn = await fetch(obj.url, {
//             method : obj.method
//         })
//     }
//     if( obj.method.toLowerCase() == "post" || obj.method.toLowerCase() == "put" || obj.method.toLowerCase() == "patch"){
//         if( ! obj.form_id ){ cl("___() object.form_id missing"); return }
//         conn = await fetch(obj.url, {
//             method : obj.method,
//             body : new FormData(_(`#${obj.form_id}`))
//         })
//     }   
//     const res = obj.is_res_json ? await conn.json() : await conn.text()

//     if( ! conn.ok && (obj.show_error_toast || obj.show_toast) ){
//         _("#toast_error").classList.remove("hidden")
//         _("#toast_error").classList.add("flex")
//         _("#toast_error").innerHTML = res
//         setTimeout(function(){
//             _("#toast_error").classList.remove("flex")            
//             _("#toast_error").classList.add("hidden")
//         }, 2000)
//         return
//     }
//     if( conn.ok && (obj.show_ok_toast || obj.show_toast) ){
//         _("#toast_ok").classList.remove("hidden")
//         _("#toast_ok").classList.add("flex")
//         _("#toast_ok").innerHTML = res
//         setTimeout(function(){
//             _("#toast_ok").classList.remove("flex")            
//             _("#toast_ok").classList.add("hidden")
//         }, 2000)
//     }
//     if(obj.callback){
//         callback(res)
//     }
// }


// ##############################
// url | is_res_json | show_error_toast | show_ok_toast |callback
async function _get(obj){
    if(! obj){ cl("___() object missing"); return }
    if(! obj.url){ cl("___() object.url missing"); return }  
    if(! obj.show_toast){ cl("___() object.show_toast missing, defaulting to false"); obj.show_toast = false }   
    if(! obj.show_error_toast){ cl("___() object.show_error_toast missing, defaulting to false"); obj.show_error_toast = false }   
    if(! obj.show_ok_toast){ cl("___() object.show_ok_toast missing, defaulting to false"); obj.show_ok_toast = false }   

    const conn = await fetch(obj.url) 
    const res = obj.is_res_json ? await conn.json() : await conn.text()

    if( ! conn.ok && (obj.show_error_toast || obj.show_toast) ){
        _("#toast_error").classList.remove("hidden")
        _("#toast_error").classList.add("flex")
        _("#toast_error").innerHTML = res
        setTimeout(function(){
            _("#toast_error").classList.remove("flex")            
            _("#toast_error").classList.add("hidden")
        }, 2000)
        return
    }
    if( conn.ok && (obj.show_ok_toast || obj.show_toast) ){
        _("#toast_ok").classList.remove("hidden")
        _("#toast_ok").classList.add("flex")
        _("#toast_ok").innerHTML = res
        setTimeout(function(){
            _("#toast_ok").classList.remove("flex")            
            _("#toast_ok").classList.add("hidden")
        }, 2000)
    }
    if(obj.callback){
        obj.callback(res)
    }
}



// let next_page = 2

// ##############################
// async function get(url, el, is_toast = false, callback){
//     const conn = await fetch(url)
//     const res = await conn.json()
//     __(".toast").forEach(el=>{el.classList.add("hidden")})
//     if(!conn.ok){
//         _("#toast_error").classList.remove("hidden")
//         _("#toast_error").classList.add("flex")
//         _("#toast_error").innerHTML = res.info
//         setTimeout(function(){
//             _("#toast_error").classList.remove("flex")            
//             _("#toast_error").classList.add("hidden")
//         }, 2000)
//         return
//     }
//     if(is_toast){
//         _("#toast_ok").classList.remove("hidden")
//         _("#toast_ok").classList.add("flex")
//         _("#toast_ok").innerHTML = res.info
//         setTimeout(function(){
//             _("#toast_ok").classList.remove("flex")            
//             _("#toast_ok").classList.add("hidden")
//         }, 2000)
//     }
//     callback(res)    
// }

// ##############################
function toast(is_ok = true, message = ""){
    // OK
    if(is_ok){
        _("#toast_ok").classList.remove("hidden")
        _("#toast_ok").classList.add("flex")
        _("#toast_ok").innerHTML = message
        setTimeout(function(){
            _("#toast_ok").classList.remove("flex")            
            _("#toast_ok").classList.add("hidden")
            _("#toast_ok").innerHTML = ""
        }, 2000)
        return        
    }
    // ERROR
    _("#toast_error").classList.remove("hidden")
    _("#toast_error").classList.add("flex")
    _("#toast_error").innerHTML = message
    setTimeout(function(){
        _("#toast_error").classList.remove("flex")            
        _("#toast_error").classList.add("hidden")
        _("#toast_error").innerHTML = ""
    }, 2000)    
    
}


// ##############################
function show_item(){
    _("#item_modal").classList.remove("hidden")
    _("#item_modal").classList.add("flex")
    _("#item_modal").classList.add("fadein")
}

// ##############################
function hide_item(){
    _("#item_modal").classList.remove("flex")
    _("#item_modal").classList.add("hidden")
}
































