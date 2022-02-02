/*Prueba_Foros_Pl*/

let rdm = Math.random().toString(36).slice(2);
let res = document.querySelector('#root');

let listaComentarios = ()=>{
    fetch('index.php')
        .then(res => res.json())
        .then(data => {
            let element = '';
            
            element +=  render();        

            let el = data ;
            data.map(d =>{
                if(d.data.posicion !== '' &  d.data.estado == 'true'){
                    element += `
                        <div class="card my-3" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title">${d.data.nombres} id: ${d.id} </h5>
                                <p class="card-text">${d.data.msg}</p>
                            </div>
                            
                        </div>
                        
                        <div class="card my-3" style="width: 100%;">
                            <div class="card-body">
                            <h5 class="card-title">Responder</h5>
                                <form action="registro1.php" method="POST"> 
                                    <div class="form-group">
                                        <label>Nombres</label>
                                        <input type="text" name="nombres" class="form-control" >
                                    </div>
                                    <div class="form-group">
                                        <label>Comentario</label>
                                        <textarea class="form-control" name="comentario" rows="3"></textarea>
                                    </div>
                                    <input type="text" value="${rdm}" name="id">
                                    <input type="text" value="pruebas" name="foro">
                                    <input type="text" value="123456789" name="cedula">
                                    <input type="text" value="${d.data.posicion},${rdm}" name="posicion">
                                    <input type="text" value="${d.id}" name="res">
                                    <input type="text" value="false" name="estado">
                                    <button type="submit" onclick="email(event)" class="btn btn-primary float-right">Submit</button>
                                </form>
                                
                            </div> 
                        </div>
                        <hr>
                        
                        <p class="h5">${d.data.posicion.split(',').length-1} Respuestas sin Moderar</p>
                        
                    `;
                    let targets =  d.data.posicion.split(',');
                    let contador = 0 ;
                    let pseudo = '';
                    targets.map(dt => {
                        el.map(e => {
                            if(e.data.unique == dt & e.data.estado == 'true'){
                                contador++;
                                pseudo += `
                                <div class="card float-right my-3 " style="width: 90%;">
                                    <div class="card-body">
                                        <h5 class="card-title">${e.data.nombres} id: ${e.id} </h5>
                                        <p class="card-text">${e.data.msg}</p>
                                    </div>
                                </div>
                            `
                            }
                        })
                    })
                    element += `
                        <p class="h5">${contador} Respuestas</p>
                        ${pseudo} 
                    `;
                }
            });
            res.innerHTML = element;
            

        }).catch(function(error) {
            
            res.innerHTML = render();
        });;

}

let render= ()=>{
    let elet = '';
    let r = Math.random().toString(36).slice(2);
    return elet = `
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">Escribe tu comentario en este Foro  </h5>
                <p class="card-text">Este foro modera tus comentarios, cuando tu mensaje sea moderado saldra en la lista de comentarios </p>
            </div>
        </div>
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">Responder</h5>
                <form action="registro.php" id="target" method="POST"> 
                    <div class="form-group">
                        <label>Nombres</label>
                        <input type="text" name="nombres" class="form-control">
                    </div>
                <div class="form-group">
                    <label>Comentario</label>
                    <textarea class="form-control" name="comentario" rows="3"></textarea>
                </div>
                    <input type="text" value="${r}" name="id">
                    <input type="text" value="pruebas" name="foro">
                    <input type="text" value="123456789" name="cedula">
                    <input type="text" value="p" name="posicion">
                    <input type="text" value="" name="res">
                    <input type="text" value="false" name="estado">
                    <button type="submit" onclick="email(event)" class="btn btn-primary float-right">Submit</button>
                </form>
            </div>
        </div>
    `;
}

let email = (e)=>{
    e.preventDefault()
    
    data = {
        'nombres' : e.target.form.nombres.value,
        'msg' : e.target.form.comentario.value,
        'foro' : e.target.form.foro.value
    }
    emailjs.init("user_BRWR18Gk7pp2BTVNbKNtr");

    let headers = {
        'Content-type': 'application/json'
    };

    let msg = `
        Nuevo Mensaje de ${data.nombres} enviado a ${data.foro} 
    `;

    let params = {
    user_id: 'user_BRWR18Gk7pp2BTVNbKNtr',
    service_id: 'service_t4wk5cf',
    template_id: 'template_hgarvmd',
    template_params: {
        'from_name': 'Foros Conectados',
        'to_name': data.nombres,
        'message': msg
        }
    };  

    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then((httpResponse) => {
        if (httpResponse.ok) {
            console.log('Your mail is sent!');
        } else {
            return httpResponse.text()
            .then(text => Promise.reject(text));
        }
        })
        .catch((error) => {
            console.log('Oops... ' + error);
        });
    e.target.form.submit();
}

listaComentarios();

/*fetch('http://localhost/foro/index.php')
    .then(res => res.json())
    .then(data =>  console.log(data));


var cadenaMeses = "Jan,ene";

var arrayDeCadenas = cadenaMeses.split(',');
console.log(arrayDeCadenas.length)
arrayDeCadenas.map(data => console.log(data));

console.log(arrayDeCadenas);*/
