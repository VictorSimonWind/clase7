import React from 'react'
import { useRef,useEffect,useState } from 'react';

export default function Apis() {
    const ic = useRef(true);
    const [state, setstate] = useState([])

    const getItem = async (form,busqueda) => {
        form.preventDefault();
        /**Una API es un conjunto de definiciones y protocolos
         * que se utiliza para desarrollar e integrar el software 
         * de las aplicaciones. 
         * API significa interfaz de programación de aplicaciones. */
        let llamada = fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`);
        llamada = await llamada;
        llamada = await llamada.text();
        try{
            llamada = JSON.parse(llamada);
            setstate(llamada.results);
        }
        catch(err){
            alert(`Error con Servidor ${err}`)
            setstate([{tittle:'sin Conexion'}])
        }
        

    }

    useEffect(()=>{
       // if (ic.current) {
       //     getItem()
       //     ic.current = false;
       // } 
       
    })


    return (
        <div>
            <form onSubmit={(data)=>{getItem(data,data.target[0].value)}}>
            <input type="text" placeholder='buscar'/>
            <button type='onSubmit'>buscar</button>
            </form>
            {state.map(element =>{
                return (
                    <Component
                        title={element.title}
                        thumbnail={element.thumbnail}
                        permalink={element.permalink}
                        price={element.price}
                        />
                )
            })}
        </div>
    )
}

export function Component(props){

    return(
        <div className='C_container'>
            <div className='C_title'>
                {<h1>{props.title}</h1>}
            </div>
            <div className='C_img'>
                <img src={props.thumbnail}/>
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
