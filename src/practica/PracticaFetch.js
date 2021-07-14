import React from 'react'
import { useState,useEffect,useRef } from 'react'

export default function PracticaFetch() {

    const getProducts = async (form,busqueda) =>{
        form.preventDefault();
        let llamada = fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`,{
            method:'GET',
            cache: 'default',
            headers:{
                'Content-Type': 'aplication/json'
            }
        });
        llamada = await llamada;
        llamada = await llamada.text();
        llamada = JSON.parse(llamada);
        console.log(llamada)

    }

    return (
        <div>
            <Form getProduct={getProducts}/>
        </div>
    )
}

//Form
export function Form(props){
    return(
        <>
        <form onSubmit={(data)=>{props.getProduct(data,data.target[0].value)}}>
            <input type='text' placeholder='buscar'/>
            <button type='submit'>buscar</button>
        </form>
        </>
    )
}
