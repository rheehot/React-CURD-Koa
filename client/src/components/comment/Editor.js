import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import CommentActionButtonsContiner from '../../containers/comment/CommentActionButtonsContiner';
import { useSelector } from 'react-redux';

 const EditorBlock = styled.div`
    /* 페이지 위아래 여백 */
    padding-top : 2.5rem;
    padding-bottom : 2.5rem;
 `

 const Editor = ({ body, onChangeField }) => {
     const quillElement = useRef(null)
     const quillInstance = useRef(null)

     useEffect(() => {
         quillInstance.current = new Quill(quillElement.current, {
             theme: 'snow',
             placeholder: '댓글은 자신의 얼굴입니다.',
             modules: {
                 toolbar: [
                    ['image'],
                 ]
             }
         },[])

         const quill = quillInstance.current
         quill.on('text-change', (delta, oldDelta, source) => {
             if(source === 'user') {
                onChangeField({key: 'body', value: quill.root.innerHTML})
             }
         })
     }, [onChangeField])


    const { comment } = useSelector(({comment}) => ({
        comment: comment.comment,
    }))

    useEffect(() => {
        if(comment) return quillInstance.current.root.innerHTML = ''
    },[comment])

    return (
        <EditorBlock>
                <div ref={quillElement}/>
                <CommentActionButtonsContiner/>
                
        </EditorBlock>
    )
}

export default Editor
