import { onUpdateUser } from '@/actions/use'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
    inititalBio: string | null;
}

export default function ModalEditAboutCard({
    inititalBio
}: Props) {
    const [newBio, setNewBio] = useState(inititalBio || '');
    const [isPending, startTransition] = useTransition();
    const useRefCloseModal = useRef<HTMLButtonElement>(null);

    const onChangeNewBioHandlder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBio(e.target.value);
    }

    const onSubmitEditBioHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        startTransition(() => {
            onUpdateUser({ bio: newBio }).
                then((res) => {
                    toast.success(`Bio updated for ${res.username}`);
                    useRefCloseModal.current?.click();
                }).catch((error) => {
                    toast.error(error.message);
                })
        })
    }

    return (
        <Dialog>
            <DialogTrigger
                asChild
            >
                <Button
                    className='ml-auto mr-3 uppercase text-lg'
                    size={'sm'}
                    variant={'link'}
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Edit your about info
                </DialogHeader>
                <form
                    className='space-y-11'
                    onSubmit={onSubmitEditBioHandler}
                >
                    <div>
                        <Input
                            placeholder='Enter your bio...'
                            onChange={onChangeNewBioHandlder}
                            value={newBio}
                            disabled={isPending}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <DialogClose asChild>
                            <Button
                                variant={'ghost'}
                                type='button'
                                ref={useRefCloseModal}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant={'primary'}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}