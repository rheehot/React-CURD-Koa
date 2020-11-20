import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialize } from '../../modules/comment'
import Editor from '../../components/comment/Editor'
import { withRouter } from 'react-router-dom'

const EditorContainer = () => {
    const dispatch = useDispatch()

    const {body} = useSelector(({comment}) => ({
        body: comment.body,
    }))

    const onChangeField = useCallback(payload => dispatch(changeField(payload)),[dispatch])

    //언마운트 시 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize())
        }
    },[dispatch])

    return (
        <Editor onChangeField={onChangeField} body={body}/>
    )
}

export default withRouter(EditorContainer)
