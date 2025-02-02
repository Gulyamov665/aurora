import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styles from '../../auth/assets/AuthForm.module.scss'
import Register from '../components/Register'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function RegistrationPage({ state }) {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const submit = (data) => {
    console.log(data)
  }

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: '30px', cursor: 'pointer', marginBottom: '20px' }}
      />
      <div className={`${styles['form-box']} card`}>
        <Register
          register={register}
          handleSubmit={handleSubmit(submit)}
          state={state}
        />
      </div>
    </div>
  )
}
