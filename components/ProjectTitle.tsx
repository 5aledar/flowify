'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useUpdateProjectTitle } from '@/hooks/useUpdateProject'

const ProjectTitle = ({ title, projectId, permission }: { title: string, projectId: string, permission?: any }) => {

    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState(title)
    const updateProjectTitleMutation = useUpdateProjectTitle();
    useEffect(() => {
        setDocumentTitle(title)
    }, [title])

    const { user } = useUser()
    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setLoading(true)
          if (documentTitle === '') {
            setDocumentTitle(title);
            setEditing(false);
            return;
          }
          if (documentTitle !== title) {
            updateProjectTitleMutation.mutate({
              projectId,
              email: user?.emailAddresses[0].emailAddress!,
              name: documentTitle,
            }, {
              onSuccess: (data) => {
                setDocumentTitle(data.name);
                setLoading(false)
                setEditing(false);
              },
              onError: (error) => {
                console.error("Error updating project title:", error);
              }
            });
          } else {
            setLoading(false)
            setEditing(false);
          }
        }
      };

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    return (
        <header className='flex w-full justify-start   items-center '>
            {editing && !loading ? (
                <Input
                    type='text'
                    value={documentTitle}
                    ref={inputRef}
                    placeholder='Enter title'
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    disabled={!editing || permission?.permissions == 'READ'}
                    className='project-title-input w-[200px] text-right p-0'
                />
            ) : (
                <p className='project-title w-[150px] sm:w-[200px]'>{documentTitle}</p>
            )}
            {!editing 
            && (permission?.permissions! === 'READ_WRITE' || !permission?.permissions) 
            ? (
                <Image
                    src={'/icons/edit.svg'}
                    alt='edit'
                    height={24}
                    width={24}
                    onClick={() => setEditing(true)}
                    className='cursor-pointer'
                />
            ) : !editing && (<p className='text-xs'>view only</p>)}
            {loading && <p className='text-sm text-gray-400'>saving...</p>}
        </header>
    )
}

export default ProjectTitle
