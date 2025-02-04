import React from 'react'
import { Input } from "@/components/ui/input"
function InputField( label:string, value:any ,handleOnchange:(value: any) => void) {
  return (
    <div>

    <label>{label}</label>
    <Input type="value" placeholder="Email" onChange={(event)=>{handleOnchange(event.target.value)}}/>  
    </div>
)
}
export default InputField