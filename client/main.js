import {ClienteAPI} from './ClienteAPI'
import Handlebars from "handlebars"

var app_plantilla = `
<h1>Lista de la compra</h1>
<input type="text" id="nuevoItem"><button id="botonInsertar">Insertar</button>
<ul id="lista">
   {{#each .}} 
    <li id="{{id}}" {{#comprado}}class="tachado"{{/comprado}}>
    {{nombre}}
    <button id="{{id}}_button">Eliminar</button>
    </li>
   {{/each}} 
</ul>
`

document.addEventListener('DOMContentLoaded', async function() {
    var cliente = new ClienteAPI()
    var items = await cliente.getItems()
    func_plantilla = Handlebars.compile(app_plantilla)
    document.getElementById('app').innerHTML = func_plantilla(items)
    
    
    document.getElementById('lista').addEventListener('click', function(evento){
        var id_target = evento.target.id
        if (evento.target.nodeName=="LI") {
            if (evento.target.className=="tachado") {
                //marcarlo como no comprado
                cliente.setItemState(id_target, false)
                evento.target.className=""
            }
            else {
                //marcarlo como comprado
                cliente.setItemState(id_target, true)
                evento.target.className="tachado"
            }
        }
        if (evento.target.nodeName=="BUTTON") {
            var id_borrar = parseInt(evento.target.id)
        }


    })

    
})

