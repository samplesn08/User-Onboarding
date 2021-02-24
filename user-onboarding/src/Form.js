import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Must provide full name'),
    email: yup.string().required('Email address is required'),
    password: yup.string().required('Password required'),
    tos: yup.boolean().oneOf([true], 'You must agree to Terms of Service'),
})
const initialValues = { 
    name: '',
    email: '',
    password: '',
    tos: false, 
}

function Form() {
    const [form, setForm] = useState(initialValues)
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        tos: false,
    })
    const [disabled, setDisabled] = useState(true);
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }
    const change = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormErrors(name, value)
        setForm({
            ...form,
            [name]: value
        });
    }

    const submit = (event) => {
        event.preventDefault();
        const newUser = { name: form.name.trim(), email: form.email.trim(), password: form.password.trim(), tos: form.tos };
        axios.post('https://reqres.in/api/users', newUser)
        .then(res => {
            console.log(res)
            setUsers(users.concat(res.data))
            setForm(initialValues)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])

    return (
        <div>
            <form onSubmit={submit}>
                <label>
                    Name:  
                    <input type='text' onChange={change} name='name' value={form.name} placeholder='Full Name'></input>
                </label><br></br>
                <label>
                    E-mail:  
                    <input type='text' onChange={change} name='email' value={form.email} placeholder='E-mail Address'></input>
                </label><br></br>
                <label>
                    Password:  
                    <input type='text' onChange={change} name='password' value={form.password} placeholder='Password'></input>
                </label><br></br>
                <label>
                    Agree to Terms of Service?  
                    <input type='checkbox' name='tos' checked={form.tos} onChange={change}></input>
                </label><br></br>
                <button disabled={disabled}>Submit</button>
                <div style={{ color:'red' }}>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </form>
            <div>
                <h2>New User:</h2>
                Name: {users.name}<br></br>
                E-mail: {users.email}<br></br>
                Agree?: {users.tos}
            </div>
        </div>
    )
}

export default Form;