'use client'

import { creatIngress } from '@/actions/ingress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk'
import { Drumstick } from 'lucide-react'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

type Props = {}

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export default function ConnectModal({ }: Props) {

    //this is a reference to the close button, this will close the modal after the connection is created
    const closeRef = useRef<ElementRef<"button">>(null);

    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const [isPending, startTransition] = useTransition();

    const onSubmitCreateIngress = () => {
        closeRef.current?.click();
        startTransition(() => {
            creatIngress(parseInt(ingressType))
                .then(() => {
                    toast.success('Connection created');
                    closeRef.current?.click();
                })
                .catch((error) => {
                    toast.error(error);
                })
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'primary'}>
                    Genrerate connection
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Genrerate connection
                    </DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Ingress Type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <Drumstick size={20} />
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        this action will reset all active stream using the current connection
                    </AlertDescription>
                </Alert>
                <div className='flex justify-between'>
                    <DialogClose
                        asChild
                        ref={closeRef}
                    >
                        <Button variant={'ghost'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        variant={'primary'}
                        onClick={onSubmitCreateIngress}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}