import React, { useState} from 'react'
import { Link , useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../contexts/AuthContext';
import useMounted from '../../../hooks/useMounted';


// toast.configure();

const Login = () => {

 const history = useHistory();

 

 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [isSubmitting,setIsSubmitting] = useState(false);

  const {login} = useAuth();

  const mounted = useMounted();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={async e=> {
                    e.preventDefault();
                    if(!email || !password){
                      toast({
                        description:'Credentials not valid',
                        status:'error',
                        duration:5000,
                        isClosable:true,
                      })
                    }
                    setIsSubmitting(true)
                    login(email,password)
                    .then(response=>{
                      // console.log(response)
                      history.push('/')
                    })
                    .catch(error=>{
                      // console.log(error.message)
                      toast({
                        description:error.message,
                        status:'error',
                        duration:5000,
                        isClosable:true,
                      })
                    })
                    .finally(()=> mounted.current && setIsSubmitting(false))


                  }} >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" value={email}  onChange={e=>setEmail(e.target.value)} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" style={{backgroundColor:"lightgreen",opacity:'5',border:'none',marginLeft:'225px'}} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Door Man</h2>
                    <p>
                     This admin dashboard contains all the information about doorman app which can only be access by authorized admin.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
