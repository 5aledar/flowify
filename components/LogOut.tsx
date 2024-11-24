import { signOut } from '@/auth'
import { CiLogout } from "react-icons/ci";
const LogOut = () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit" className=' rounded-md flex justify-center items-center cursor-pointer '><CiLogout strokeWidth={2} size={16} /></button>
            </form>
        </div>
    )

}

export default LogOut