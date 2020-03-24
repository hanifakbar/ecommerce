import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {Redirect} from 'react-router-dom'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import Numeral from 'numeral'
import Axios from 'axios'
import {API_URL} from './../support/ApiUrl'
import {FaArrowAltCircleRight} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions/HeaderAction'
import {FaCartPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ProductItem from "./ProductItem"

class Home extends Component {
    state = {
        photos:[
            './image/drone.jpg',
            './image/motor.jpg',
            './image/sepatu.jpg'
        ],
        products:[],
        searchProducts:[],
        sortNama:0,
        sortPrice:0
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    

    // componentWillUnmount=()=>{
    //     console.log('jalan unmount')
    //     this.props.bukan()
    // }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100%',height:500,display:'flex'}}>
                            <img
                                src={val}
                                alt="First slide"
                                width='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.nama}</button>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }
    onSearchClick=()=>{
        let inputName=this.name.value
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)


        let hasilFilter=this.state.products.filter((product)=>{
            return (
                // akan mereturn true atau false 
                product.name.toLowerCase().includes(inputName.toLowerCase())
                
            )
        })
        let hasilFilterPrice=hasilFilter.filter((product)=>{
            
                if (!inputMax && !inputMin){
                    return hasilFilter
                } if (inputMax && inputMin) {
                    return (product.price>=inputMin && product.price<=inputMax)
                } if (inputMax && !inputMin){
                    return (product.price<=inputMax)
                } if (!inputMax && inputMin){
                    return (product.price>=inputMin)
                }
        })

        this.setState({searchProducts:hasilFilterPrice})
    }

    onResetClick=()=>{
        this.name.value=''
        this.min.value=''
        this.max.value=''
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    urut=(a,b)=>{
        return a.price-b.price
    }
    urutDes=(a,b)=>{
        return b.price-a.price
    }
      
    urutHuruf=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   
    urutHurufDes=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=>{
        if (!this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:1})
        } if (this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:0})
        }
    }
    onSortPrice=()=>{
        if (!this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urut)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:1})
        } if (this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:0})
        }
    }

    // membuat list, akan menggunakan map
    renderList=()=>{
        // products adalah array of object [{}, {}, {},..]
        // product adalah {id, name, desc, price, pic}
        return this.state.searchProducts.map((product)=>{
            return(
                <ProductItem barang={product} key={product.id}/>
            )
            
        })  
    }

    render() {
        return (
            <div>
                <MDBCarousel
                    activeItem={1}
                    length={this.state.photos.length}
                    interval={2000}
                    showIndicators={false}
                    showControls={false}
                >
                    <MDBCarouselInner>
                        {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>
                <div className='px-5 pt-3'>
                    <div>Best seller <FaArrowAltCircleRight/></div>
                    <div className="d-flex ">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{BukanHome,IniHome}) (Home);