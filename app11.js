/*Prueba_Foros_Pl*/

let rdm = Math.random().toString(36).slice(2);
let res = document.querySelector('#root');
let cedula = '1030679367';
let msgAd ='';
let foro = 'pruebas';
let isMsg = false;

let a = new Date("02/01/22");
let b = new Date("02-25-22");
let c = new Date("02/25/22");

console.log("a: "+a);
console.log("b: "+b);
console.log("c: "+c);

console.log("holasda "+cedula);
let getData = ()=>{
    fetch('index.php')
        .then(res => res.json())
        .then(data => {
            
            
            console.log(data);
            (c>a & c<=b) ? listaComentarios(data) : res.innerHTML = render();

        }).catch(function(error) {
            console.log("error"+error)
            res.innerHTML = render();
        });;

}

let listaComentarios = (data) =>{
    let el = data ;
    let element = '';
    data.map(d =>{
        if(d.data.cedula == cedula){
            let msgAdmin = (d.data.cedula == cedula ) ? d.data.msgAdmin : '';
            let msg = (msgAdmin == '' || msgAdmin == 'null' ) ? 'Sin Comentarios': d.data.msgAdmin;
            let estado = (d.data.estado == 'true' ) ? 'mostrado' : 'No mostrado';
            msgAd = `
                <p class="card-text">
                    Comentario del Moderador: ${msg} <br>
                    Estado del comentario : ${estado}
                </p>
            `;
            isMsg = true;
        }
        //console.log(d.data.posicion !== '' &  d.data.estado == 'true' & foro == d.data.foro || isMsg == true);
        /*let fecha1 =  d.data.fecha_creacion;
        let fecha2 =  new Date(Date.now());
        console.log(fecha2.toLocaleDateString()) 
        console.log(fecha1) 
        var day1 = new Date(fecha1);
        var day2 = new Date(fecha2);*/


        var day1 = new Date("08/25/2021"); 
        var day2 = new Date("08/25/2021");

        var difference= Math.abs(day2-day1);
        days = difference/(1000 * 3600 * 24)

        console.log(days);
        /*
        var difference= Math.abs(day2-day1);
        days = difference/(1000 * 3600 * 24)

        console.log(days)        
        */
        if(d.data.posicion !== '' &  d.data.estado == 'true' & foro == d.data.foro || isMsg == true ){
            element += `
                <div class="card my-3" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">
                            ${d.data.nombres} id: ${d.id} cedula: ${d.data.cedula}
                        </h5>
                        <p class="text-muted"></p>
                        <p class="card-text">${d.data.msg}</p>
                        ${(d.data.cedula == cedula) ? msgAd: ''}
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
                            <input type="text" hidden value="${rdm}" name="id">
                            <input type="text" hidden value="pruebas" name="foro">
                            <input type="text" hidden value="123456789" name="cedula">
                            <input type="text" hidden value="${d.data.posicion},${rdm}" name="posicion">
                            <input type="text" hidden value="${d.id}" name="res">
                            <input type="text" hidden value="false" name="estado">
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
            isMsg = false;
            targets.map(dt => {
                el.map(e => {
                    if(e.data.cedula == cedula){
                        let msgAdmin = (e.data.cedula == cedula ) ? e.data.msgAdmin : '';
                        let msg = (msgAdmin == '') ? 'Sin Comentarios': e.data.msgAdmin;
                        let estado = (e.data.estado == '' ) ? 'No mostrado' : 'mostrado';
                        msgAd = `
                            <p class="card-text">
                                Comentario del Moderador: ${msg} <br>
                                Estado del comentario : ${estado}
                            </p>
                        `;
                        isMsg = true;
                    }
                    if(e.data.unique == dt & e.data.estado == 'true' || isMsg == true & e.data.unique == dt ){
                        contador++;
                        pseudo += `
                        <div class="card float-right my-3 " style="width: 90%;">
                            <div class="card-body">
                                <h5 class="card-title">${e.data.nombres} id: ${e.id} cedula: ${d.data.cedula}</h5>
                                <p class="card-text">${e.data.msg}</p>
                                ${(d.data.cedula == cedula) ? msgAd: ''}
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
        isMsg = false;
    });
    res.innerHTML = element;
}

let render= ()=>{
    
    let r = Math.random().toString(36).slice(2);
    return `
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">Escribe tu comentario en este Foro  </h5>
                <p class="card-text">Este foro modera tus comentarios, cuando tu mensaje sea moderado saldra en la lista de comentarios </p>
            </div>
        </div>
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">Responder</h5>
                <form action="registro1.php" id="target" method="POST"> 
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

getData();

/*fetch('http://localhost/foro/index.php')
    .then(res => res.json())
    .then(data =>  console.log(data));


var cadenaMeses = "Jan,ene";

var arrayDeCadenas = cadenaMeses.split(',');
console.log(arrayDeCadenas.length)
arrayDeCadenas.map(data => console.log(data));

console.log(arrayDeCadenas);

if(d.data.cedula == cedula){
                    let msgAdmin = (d.data.cedula == cedula ) ? d.data.msgAdmin : '';
                    let msg = (msgAdmin == '') ? 'Sin Comentarios': d.data.msgAdmin;
                    let estado = (d.data.estado == '' ) ? 'No mostrado' : 'mostrado';
                    let msgAd = `
                        <p class="card-text">
                            Comentario del Moderador: ${msg} <br>
                            Estado del comentario : ${estado}
                        </p>
                    `;
                }
                console.log("asdf");


*/
