//import { createAdUser, IAduser } from "@/app/interfaces/aduser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface AdUserDrawerProps {
    isOpen: boolean;
    //data: IAduser;
    onClose: () => void;
    onSave: (formData: any) => void;
}


//export default function AdUserDrawer({ isOpen, data, onClose, onSave }: AdUserDrawerProps) {
export default function AdUserDrawer({ isOpen, onClose, onSave }: AdUserDrawerProps) {

    // const [formData, setFormData] = useState(createAdUser());
    // useEffect(() => {
    //     Object.assign(formData, data);
    //     if (data) {
    //         setFormData(data);
    //     } else {
    //         setFormData(createAdUser)
    //     }
    // }, [data])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //setFormData(initForm);
        //onSave(formData);
      };

    return (
        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{true ? "แก้ไขข้อมูล" : "เพิ่ม"}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
                </div>
                <div className="p-4 h-[calc(100vh-60px)] overflow-auto">
                    {/* <UserForm user={user} onSave={onSave} onCancel={onClose} /> */}

                    {/* <form onSubmit={handleSubmit}> */}
                        <form >
                        <div className="block mt-2">
                            Input
                            <Input/>                            
                        </div>

                        {/* <div className="block">Distinguished Name (DN) : {data.dn}</div> */}

                        <div className="mt-5 flex justify-end gap-3">
                            <Button className="bg-green-600 hover:bg-green-500" type="submit">บันทึก</Button>
                            <Button className="bg-slate-500 hover:bg-slate-400" onClick={onClose}>ยกเลิก</Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
