import { AddStaffMutationType, GetStaffQueryType, LazyGetUserRoleQueryType } from "@store/admin/api/staffApi"
import { RoleType, VendorInfoType } from "@store/user/types"
import { Control, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

export type DataType ={
    first_name: string
    phone: string
    password_1: string
    password_2: string
    role: number | string
    restaurant_id:number
}

export type FormDataType = {
    register: UseFormRegister<DataType>
    handleSubmit: UseFormHandleSubmit<DataType>
    control: Control<DataType>
}

export type StaffAdminProps = {
    staffData: GetStaffQueryType[0]
    addStaff: AddStaffMutationType[0]
    getRoles: LazyGetUserRoleQueryType[0]
    rolesData?: RoleType[]
    vendor : VendorInfoType

}

export type AddStaffProps = {
    addStaff: AddStaffMutationType[0]
    getRoles: LazyGetUserRoleQueryType[0]
    rolesData?: RoleType[]
    vendor : VendorInfoType
}

export type StaffViewProps = {
    staffData: GetStaffQueryType[0]
}

export type FormStaffProps ={
    rolesData?:RoleType[]
    register: UseFormRegister<DataType>
    handleSubmit: UseFormHandleSubmit<DataType>
    submit: SubmitHandler<DataType>
    control: Control<DataType>
}