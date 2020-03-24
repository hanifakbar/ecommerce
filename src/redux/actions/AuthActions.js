import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from './type'
import { API_URL } from '../../support/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){//kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){//user ada
                    localStorage.setItem('iduser',res.data[0].id)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0]})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}
export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}


export const LoginSuccessAction=(datauser)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:datauser
    }
}


export const Login_error=()=>{
    return(dispatch)=>{
        dispatch({type:'LOGIN_ERROR',payload:'Login_error'})
    }
}

export const countCart = (number) => {
    return {
        type: 'COUNT_CART',
        payload: number
    }
}

export const GantiPassword = (passwordbaru) => {
    return {
      type: "GANTI_PASSWORD",
      payload: passwordbaru
    };
};