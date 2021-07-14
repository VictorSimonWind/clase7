import React from 'react'
import { useEffect,useRef, useState } from 'react';

 
  //DOCUMENTACION DE FECTH https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 

export default function FecthCalls() {

    const ic = useRef(true);
    const [state, setstate] = useState([])

    const getItem = async () => {
/*fecth por defecto tiene method GET() */
    // Ejemplo POST method 
   // Las opciones por defecto estan Marcadas con *
      const llamada =  fetch(`http://localhost:4000/products`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: "" // la data del cuerpo debe ser del mismo tipo que el "Content-Type" header
          });
        llamada = await llamada;
        llamada = await llamada.text();
        try{
            llamada = JSON.parse(llamada);
            setstate(llamada);
        }
        catch(err){
            alert(`Error con Servidor ${err}`)
            setstate([{tittle:'sin Conexion'}])
        }
        

    }
    const putItem = async (form) =>{
        form.preventDefault();

        let newItem = {
        id: Math.floor(Math.random() * 4000),
        image: form.target[2].value,
        tittle:form.target[0].value,
        descripcion: form.target[1].value,
        price: form.target[3].value,
        categoria:form.target[4].value
        }

        console.log(newItem);
        newItem = JSON.stringify(newItem);
        console.log(newItem);

        let llamada = fetch(`http://localhost:4000/newProduct`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: newItem
        });
        llamada = await llamada;
        llamada = await llamada.text();
        console.log(llamada);
    }



    useEffect(()=>{
        if (ic.current) {
            getItem()
            ic.current = false;
        } 
       
    })


    return (
        <div>
            <Form
                putItem={putItem}
            />
            {state.map(element =>{
                return (
                    <Component
                        key={element.id}
                        title={element.tittle}
                        image={element.image}
                        permalink={element.descripcion}
                        price={element.price}
                        />
                )
            })}
        </div>
    )
}

/* COMPONENTE  */
export function Component(props){

    return(
        <div className='C_container'>
            <div className='C_title'>
                {<h1>{props.title}</h1>}
            </div>
            <div className='C_img'>
                <img alt='product' src={props.image}/>
            </div>
            <div className='C_desc'>
                {<p>{props.permalink}</p>}
            </div>
            <div className='C_price'>
                {<p>{props.price}</p>}
            </div>
        </div>

    )

}
/* COMPONENTE FORMULARIO */
export function Form(props){
   return (
       <form onSubmit={(data)=>{props.putItem(data)}}>
           <input type='text' placeholder='Nombre de Producto'/>
           <input type='text' placeholder='descripcion de producto'/>
           <input type='text' placeholder='link de imagen'/>
           <input type='text' placeholder='categoria'/>
           <input type='text' placeholder='price'></input>
           <button>agregar Item</button>
       </form>
   )
}
