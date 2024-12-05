'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import { useSendInvite } from "@/hooks/useSendInvite"
import { useUser } from "@clerk/nextjs"
enum Permissions {
    READ = 'READ',
    READ_WRITE = 'READ_WRITE'
}
const Invite = ({ projectId  , access}: { projectId: string , access: any}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [permission, setPermission] = useState<'READ' | 'READ_WRITE'>('READ')
    const [loading, setLoading] = useState(false)
    const { mutate, error } = useSendInvite();
    const handleStatusChange = (newStatus: 'READ' | 'READ_WRITE') => {
        setPermission(newStatus);
    };

    const { user } = useUser()

    const handleSendInvite = async (e: FormEvent) => {

        e.preventDefault();
        setIsOpen(false);
        try {
            setLoading(true);
            await mutate({ senderEmail: user?.emailAddresses[0].emailAddress!, userEmail, projectId, permission });
        } catch (error) {
            console.log("Failed to send invite:", error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    };
    
    return (
        <Dialog >
            <DialogTrigger asChild disabled={ access?.permissions == 'READ'}>
                <Button variant="outline">Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSendInvite}>
                    <DialogHeader>
                        <DialogTitle>Invite other user</DialogTitle>
                        <DialogDescription>
                            send invites to other users here . Click send when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right" >
                                Email
                            </Label>
                            <Input id="name" value={userEmail} type="email" className="col-span-3" onChange={(e) => setUserEmail(e.target.value)} />
                            <Label className="text-right" >
                                permissions
                            </Label>
                            <Select defaultValue={permission} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-[180px]" >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={Permissions.READ}>view</SelectItem>
                                    <SelectItem value={Permissions.READ_WRITE}>edit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{loading ? 'sending...' : 'Send invite'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Invite