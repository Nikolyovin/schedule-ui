import { URL_SERVER } from '@/common'
import { ICreateEntry, IEntry } from '@/models/models'
import axios, { AxiosResponse } from 'axios'

export default class EntryService {
    static async getAll(): Promise<AxiosResponse<IEntry[]>> {
        const response = await axios.get(`${URL_SERVER}api/entries`)
        return response
    }

    static async create(payload: ICreateEntry): Promise<AxiosResponse<IEntry>> {
        const response = await axios.post(`${URL_SERVER}api/entries`, { ...payload })
        return response
    }

    static async delete(id: string): Promise<AxiosResponse<IEntry>> {
        const response = await axios.delete(`${URL_SERVER}api/entries/${id}`)
        return response
    }

    static async update(id: string, payload: ICreateEntry): Promise<AxiosResponse<IEntry>> {
        const response = await axios.put(`${URL_SERVER}api/entries/${id}`, { ...payload })
        return response
    }
}
