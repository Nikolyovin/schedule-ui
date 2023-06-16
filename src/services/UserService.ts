import { URL_SERVER } from '@/common'
import { ICreateUser, IUpdateUser, IUser } from '@/models/models'
import axios, { AxiosResponse } from 'axios'

export default class UserService {
    static async getAll(): Promise<AxiosResponse<IUser[]>> {
        const response = await axios.get(`${URL_SERVER}api/users`)
        return response
    }
    static async create(payload: ICreateUser): Promise<AxiosResponse<IUser>> {
        const response = await axios.post(`${URL_SERVER}api/users`, { ...payload })
        return response
    }
    static async update(id: string, payload: IUpdateUser): Promise<AxiosResponse<IUser>> {
        const response = await axios.put(`${URL_SERVER}api/users/${id}`, { ...payload })
        return response
    }
}
