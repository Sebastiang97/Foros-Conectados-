const res = document.querySelector('#root');
let foro = 'pruebas';

let getData = ()=>{
    fetch('index.php')
        .then(res => res.json())
        .then(data => {
        
        console.log(render());

        res.innerHTML +=  render();
        listaComentarios(data, foro);
        }).catch(function(error) {
            console.log("error"+error)
            res.innerHTML = render();
        });;
}

let listaComentarios = (data) =>{
    let rdm = Math.random().toString(36).slice(2);
    let el = data ;
    let element = '';
    data.map(d =>{
        if(d.data.posicion !== '' & foro == d.data.foro){
            let bg = d.data.estado == 'true' ? 'bg-success' : 'bg-danger';
            let checked = d.data.estado == 'true' ? 'checked' : '';
            element += `
                <div class="card ${bg} my-3" style="width: 100%;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-title">${d.data.nombres} id: ${d.id} </h5>
                                <p class="card-text">${d.data.msg}</p>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group float-right">
                                <form action="admin.php" method="POST"> 
                                    <input type="text" hidden value="${d.id}" name="id">
                                    <label> Mostrar </label>
                                    <label class="switch ">
                                    <input type="checkbox" value="true" name="estado" ${checked}>
                                    <span class="slider round"></span>
                                    </label>
                                    <button type="submit" class="btn btn-primary mx-2">Moderar</button>
                                </form>
                                </div>
                            </div>
                        </div>
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
                            <input type="text" hidden value="true" name="estado">
                            <button type="submit" class="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
                <hr>
                <p class="h5">${d.data.posicion.split(',').length-1} Respuestas</p>
            `;
            let targets =  d.data.posicion.split(',');
            targets.map(dt => {
                el.map(e => {
                    if(e.data.unique == dt){
                        let bg = e.data.estado == 'true' ? 'bg-success' : 'bg-danger';
                        let checked = e.data.estado == 'true' ? 'checked' : '';
                        element += `
                        <div class="card ${bg} float-right my-3 " style="width: 90%;">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h5 class="card-title">${e.data.nombres} id: ${e.id} </h5>
                                        <p class="card-text">${e.data.msg}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group float-right">
                                        <form action="admin.php" method="POST"> 
                                            <input type="text" hidden value="${e.id}" name="id">
                                            <label> Mostrar </label>
                                            <label class="switch ">
                                            <input type="checkbox" value="true" name="estado" ${checked}>
                                            <span class="slider round"></span>
                                            </label>
                                            <button type="submit" class="btn btn-primary mx-2">Moderar</button>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        `
                    }
                })
            })
        }
    });
    res.innerHTML += element;
}

let render= ()=>{

let r = Math.random().toString(36).slice(2);
console.log("asdfa")
return `
    <p class="h3">Navégala con Netflix</p>
    <p class="h4">Por: Administrador de Foro</p>
    <div class="text-center">
        <img class="img-fluid m-3" src="https://picsum.photos/500" alt="">
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
                <input type="text" hidden value="${r}" name="id">
                <input type="text" hidden value="pruebas" name="foro">
                <input type="text" hidden value="123456789" name="cedula">
                <input type="text" hidden value="p" name="posicion">
                <input type="text" hidden value="" name="res">
                <button type="submit" class="btn btn-primary float-right">Submit</button>
            </form>
        </div>
    </div>
`;
}

getData();

