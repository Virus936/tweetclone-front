import React, {useState} from 'react';
import styles from './Register.module.css';
import {Redirect} from 'react-router-dom'

import { API_URL } from '../../setting';
import {useForm } from 'react-hook-form'

function Register() {
  const { register,setError, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async data => {
    const registerForm = new FormData()
    for (let key in data) {
      registerForm.append(key, data[key])

    }

    const requestOptions = {
      method: 'POST',
      body: registerForm,
      redirect: 'follow'
    };
    let response = await fetch(`${API_URL}/auth/register/`, requestOptions)
    if (response.status == 400) {
      response = await response.json()
      Object.keys(response).forEach(key => setError(key,{message: response[key][0] }))
      setError('password2', {message:'le mot de passe doit faire 8 caractère et ne doit pas être trop courant'})
    }else{
      window.location='/'
    }
  }
  


  return (
    <form className={styles.Register} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputElement}>
        <input name="username" {...register("username", {required:true, minLength:{ value:4, message:"minimum 8 caractères" }})} placeholder="username"/>
        {errors.username && <small>{ errors.username.message }</small> }
      </div>
      <div className={styles.inputElement}>
        <input name="email" {...register("email", { 
          required: {value: true, message:'indiquez votre email'  }, 
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message:'veuillez entrer une adresse valid'}, 
        })} placeholder="email" />
        {errors.email && <small>{ errors.email.message }</small> }
      </div>
      <div className={styles.inputElement}>
        <input name="password" type="password" {...register("password", { required: true })} placeholder="password" />
      </div>
      <div className={styles.inputElement}>
        <input name="password2" type="password" {...register("password2", {validate: value => value ===watch('password')|| "Les mots de passe de match pas" })} placeholder="password2" />

        {errors.password2 && <small>{ errors.password2.message }</small> }
      </div>
      <div className={styles.inputElement}>
        <input name='first_name' {...register("first_name", { required: true ,pattern: /^[A-Za-z]+$/i })} placeholder="firstname" />
      </div>
      <div className={styles.inputElement}>
        <input name='last_name' {...register("last_name", { required: true, pattern: /^[A-Za-z]+$/i })} placeholder="lastname" />
      </div>

      <div className={styles.inputElement}>
        <input className={styles.validatorInput} type="submit" value ="s'inscrire" />
      </div>
    </form>
  );
}

export default Register;
