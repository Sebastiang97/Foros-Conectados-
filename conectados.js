<style>
#root{
    padding: 0 100px;
}

.respuestas{
    margin-left: auto;
}
</style>
<div class="col-sm-12 m-3">
   
   <div id="root" class="my-3">
    
   </div>
</div>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
let foro = 'pruebas'
/*Prueba_Foros_Pl*/

let rdm = Math.random().toString(36).slice(2);
let res = document.querySelector('#root');

function getNameUserById() {
    Liferay.Service(
        '/user/get-user-by-id', {
        userId: themeDisplay.getUserId()
    },
        function (obj) {
            
            console.log(obj);
            let cedula = obj.screenName;
            let nombres = obj.firstName + ' '+ obj.lastName;
            console.log("cedula: "+cedula);
            console.log("nombres: "+nombres);
            listaComentarios(cedula,nombres);
        
        }
    );
}
    getNameUserById();


let listaComentarios = (ced, nom)=>{
    fetch('http://localhost/coments/index.php')
        .then(res => res.json())
        .then(data => {
            let element = '';
            
            res.innerHTML +=  render(ced, nom);        

            let el = data ;
            data.map(d =>{
                if(d.data.posicion !== '' &  d.data.estado == 'true' &  d.data.foro == foro){
                    element += `
                        <div class="card my-3" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="h5"><#noparse>${d.data.nombres}</#noparse> id: <#noparse>${d.id}</#noparse> </h5>
                                <p class="card-text"><#noparse>${d.data.msg}</#noparse></p>
                            </div>
                            
                        </div>
                        
                        <div class="card my-3" style="width: 100%;">
                            <div class="card-body">
                                <form action="http://localhost/coments/registro1.php" method="POST"> 
                                    <div class="form-group">
                                        <label >Responder</label>
                                        <textarea class="form-control" name="comentario" rows="3"></textarea>
                                    </div>
                                    <input type="text" hidden value="<#noparse>${nom}</#noparse>" name="nombres" >
                                    <input type="text" hidden value="<#noparse>${rdm}</#noparse>" name="id">
                                    <input type="text" hidden value="pruebas" name="foro">
                                    <input type="text" hidden value="<#noparse>${ced}</#noparse>" name="cedula">
                                    <input type="text" hidden value="<#noparse>${d.data.posicion}</#noparse>,<#noparse>${rdm}</#noparse>" name="posicion">
                                    <input type="text" hidden value="<#noparse>${d.id}</#noparse>" name="res">
                                    <input type="text" hidden value="false" name="estado">
                                    <div class="form-group">
                                        <button type="submit" onclick="email(event)" class="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                                
                            </div> 
                        </div>
                        <hr>
                        
                        <p class="h5"><#noparse>${d.data.posicion.split(',').length-1}</#noparse> Respuestas sin Moderar</p>
                        
                    `;
                    let targets =  d.data.posicion.split(',');
                    let contador = 0 ;
                    let pseudo = '';
                    targets.map(dt => {
                        el.map(e => {
                            if(e.data.unique == dt & e.data.estado == 'true'){
                                contador++;
                                pseudo += `
                                <div class="card my-3 respuestas" style="width: 90%;">
                                    <div class="card-body">
                                        <h5 class="h5"><#noparse>${e.data.nombres}</#noparse> id: <#noparse>${e.id}</#noparse> </h5>
                                        <p class="card-text"><#noparse>${e.data.msg}</#noparse></p>
                                    </div>
                                </div>
                            `
                            }
                        })
                    })
                    element += `
                        <p class="h5"><#noparse>${contador}</#noparse> Respuestas</p>
                        <#noparse>${pseudo}</#noparse> 
                    `;
                }
            });
            res.innerHTML += element;
            

        }).catch(function(error) {
            
            res.innerHTML = render();
        });;

}

let render= (ced, nom)=>{
    
    let r = Math.random().toString(36).slice(2);
    return `
        <p class="h3">Navégala con Netflix</p>
        <p class="h4">Por: Sebastian Sanabria</p>
        <div class="text-center">
            <img class="img-fluid m-3" src="https://picsum.photos/500" alt="">
        </div>
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                <h5 class="h5">Escribe tu comentario en este Foro  </h5>
                <p class="card-text">Este foro modera tus comentarios, cuando tu mensaje sea moderado saldra en la lista de comentarios </p>
            </div>
        </div>
        <div class="card my-3" style="width: 100%;">
            <div class="card-body">
                
                <form action="http://localhost/coments/registro1.php" id="target" method="POST"> 
                    <div class="form-group">
                        <label >Responder</label>
                        <textarea class="form-control" name="comentario" rows="3"></textarea>
                    </div>
                    <input type="text" hidden value="<#noparse>${nom}</#noparse>" name="nombres">
                    <input type="text" hidden value="<#noparse>${r}</#noparse>" name="id">
                    <input type="text" hidden value="pruebas" name="foro">
                    <input type="text" hidden value="<#noparse>${ced}</#noparse>" name="cedula">
                    <input type="text" hidden value="p" name="posicion">
                    <input type="text" hidden value="" name="res">
                    <input type="text" hidden value="false" name="estado">
                    <button type="submit" onclick="email(event)" class="btn btn-primary ">Submit</button>
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
        Nuevo Mensaje de <#noparse>${data.nombres}</#noparse> enviado a <#noparse>${data.foro}</#noparse> 
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
            e.target.form.submit();
        } else {
            return httpResponse.text()
            .then(text => Promise.reject(text));
        }
        })
        .catch((error) => {
            console.log('Oops... ' + error);
        });
    //e.target.form.submit();
}


</script>