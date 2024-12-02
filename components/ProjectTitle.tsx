'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import axios from 'axios'

const ProjectTitle = ({ title, projectId }: { title: string, projectId: string }) => {
    
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState(title)
    useEffect(()=>{
        setDocumentTitle(title)
    },[title])
    
    
    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if ( documentTitle == '') {
                setDocumentTitle(title)
                setEditing(false)
                return
            }
            setLoading(true)
            try {
                if (documentTitle !== title ) {
                    const  data  = await axios.put(`/api/projects/${projectId}`, { name: documentTitle })
                    if (data.status === 200) {
                        setDocumentTitle(data.data.name)
                        setEditing(false)
                        
                    }
                }
            } catch (error) {
                console.error("Error updating project title:", error)
            } finally {
                setLoading(false)
            }
        }
    }
    
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    return (
            <header  className='flex w-full justify-start gap-4  items-center pt-8'>
                {editing && !loading ? (
                    <Input
                        type='text'
                        value={documentTitle}
                        ref={inputRef}
                        placeholder='Enter title'
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        onKeyDown={updateTitleHandler}
                        disabled={!editing}
                        className='project-title-input w-[200px] text-right p-0'
                    />
                ) : (
                    <p className='project-title w-[200px]'>{documentTitle}</p>
                )}
                {!editing && (
                    <Image
                        src={'/icons/edit.svg'}
                        alt='edit'
                        height={24}
                        width={24}
                        onClick={() => setEditing(true)}
                        className='cursor-pointer'
                    />
                )}
                {loading && <p className='text-sm text-gray-400'>saving...</p>}
            </header>
    )
}

export default ProjectTitle
