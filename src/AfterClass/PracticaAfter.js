import React from 'react'
import { useState,useEffect,useRef } from 'react'


//COMPONENTE CONTENEDOR
export default function PracticaAfter() {

    const [products,setProductos] = useState([]);

    const initialRender = useRef(true);

    const getProducts = async (data) =>{
        data.preventDefault();
        let llamada = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${data.target[0].value}`);
        try{
            llamada = llamada;
            llamada = await llamada.text();
            llamada = JSON.parse(llamada);
            //manejo de llamadas fallidas a la API
            if(llamada.error){
                throw new Error(llamada.error)
            }
            else{
               setProductos(llamada.results) 
            }         

        } catch (err){
            alert(err);
        }
         
    }

    const getPrinitialRender = async () =>{
        let llamada = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=ofertas`);
        try{
            llamada = llamada;
            llamada = await llamada.text();
            llamada = JSON.parse(llamada);
            //manejo de llamadas fallidas a la API
            if(llamada.error){
                throw new Error(llamada.error)
            }
            else{
               setProductos(llamada.results) 
            }         

        } catch (err){
            alert(err);
        }
    }

   /*  useEffect(()=>{
        getPrinitialRender();
    })
 */
    useEffect(()=>{
        if(initialRender.current)
        {
            initialRender.current = false;
        }else{
            alert('productos actualizados');
        }
        
    },[products])

    return (
        <div>
            <h1>Practica After</h1>
            <Form buscarPR={getProducts}/>
            {products.map(element =>{
                return(
                    <Producto title={element.title} 
                              image={element.thumbnail}
                              price={element.price} />           
                     )
            })}
        </div>
    )
}

//COMPONENTE FORM
export function Form(props)
{
    return (
        <form onSubmit={(data)=>{props.buscarPR(data)}}>
            <input type='text' placeholder='buscar'/>
            <button type='submit'>buscar</button>
        </form>
    )
}
//PRODUCTO
export function Producto(props){
    return(
        <>
        <h5>{props.title}</h5>
        <img style={{width:'100px'}} src={props.image}/>
        {<p>{props.price}</p>}
        </>
    )
}
