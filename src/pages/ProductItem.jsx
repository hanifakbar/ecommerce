import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const onAddCart=(ID,JUMLAH)=>{
    return{
        type:"ADD_CART",
        payload:{
            id:ID,
            jumlah:JUMLAH
        }
    }
}


class ProductItem extends Component{

    state={
        selectedId:"",
        selectedJumlah:0,
    }

    onAddClick=(id)=>{
        let jumlahInput=parseInt(this.jumlah.value) 
            if (this.jumlah.value==""){
                jumlahInput=1
            }
        this.setState({selectedJumlah:jumlahInput})
        axios.get(
            `http://localhost:2019/products`,
            {
                param:{
                    id:id
                }
            }
           
        ).then((res)=>{
            this.setState({selectedId:res.data[id-1].id})
            var jenis=this.state.selectedId
            var jumlah=this.state.selectedJumlah
            var newCart={
                jenis,jumlah
            }
            
            var oldCart=JSON.parse(localStorage.getItem('userCart')) || []
            oldCart.push(newCart)
            localStorage.setItem('userCart', JSON.stringify(oldCart))
            

            
            
        }).catch((err)=>{

        })
    }

    
    render(){
        let {id, name, price, pic} = this.props.barang
        
        return(
            <div className="card col-4 mb-2 shadow-sm p-4">
                
                <Link to={`/productdetail/${id}`}>
                    <div className="text-center" style={{height:"200px"}}>
                        <img className="" src={pic} style={{width:"200px"}}/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-dark" style={{height:"60px"}} >{name}</h5>
                    </div>
                </Link >
                    <div className="text-right">    
                        <h5 className="card-text text-right text-success d-inline" style={{height:"20px"}} >Rp. {price}</h5>
                        <span className="mx-1">x</span> 
                        <input 
                            ref={(input)=>{this.jumlah=input}}
                            min="1"
                            className="form-control my-2 btn-light align-self-end shadow-sm d-inline" 
                            style={{width:"60px"}}  
                            type="number" name="" id="" /> 
                    </div>
                    <div>
                        <button onClick={()=>{this.onAddClick(id)}} className="btn btn-block btn-outline-primary my-1 shadow" size="sm">Add to cart</button>
                    </div>
            </div>
           
        )
            
    }
}

export default connect(null,{onAddCart})(ProductItem)