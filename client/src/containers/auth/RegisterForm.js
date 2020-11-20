import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initalizeForm, register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { check } from '../../modules/user'
import { withRouter } from 'react-router-dom'

const RegisterForm = ({ history }) => {
    const dispatch = useDispatch()
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }))

    const [error, setError] = useState(null)

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault()
        const { username, password, passwordConfirm } = form

        //하나라도 비어 있다면
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요')
            return
        }
        //비밀번호 일치하지 않을때
        if(password !== passwordConfirm){
            setError('비밀번호가 일치하지 않습니다.')
            dispatch(changeField({form:'register', key: 'password', value:''}))
            dispatch(changeField({form:'register', key: 'passwordConfirm', value:''}))
            return
        }
        
        dispatch(register({ username, password }))
    }

    //컴포넌트가 처음 렌더링 될 때 form을 초기화함
    useEffect(() => {
        dispatch(initalizeForm('register'))
    }, [dispatch])

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [history, user])

    //회원가입 성공/실패 처리
    useEffect(() => {
        if (authError) {
            if(authError.response.status === 409){
                setError('이미 존재하는 계정명 입니다.')
            }
            //기타
            setError('회원가입 실패')
            return
        }
        if (auth) {
            console.log('회원가입 성공')
            console.log(auth)
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    //유저가 잘 넘어갔는지 확인
    useEffect(()=> {
        if(user){
            console.log('check API 성공')
            console.log(user)
            history.push('/')
            try{
                localStorage.setItem('user', JSON.stringify(user))
            }catch(e) {
                console.log('localStorage is not working')
            }
        }
    }, [history, user])

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )
}

export default withRouter(RegisterForm)
