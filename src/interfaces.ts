/*
This file is part of `Cloudisense` 
Copyright 2018 Connessione Technologies

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { AuthData, ClientState, LogInfo, RuleInfo } from "./models";


// interfaces

export interface OSStats {
    arch: string;

    name: string;

    type: string;

    flavor: string;

    version: string;

    boot_time: number;

    uptime: number;

    system_datetime: string;

    timezone: string;
}


export interface CPUStats {
    
    frequency: string;

    count: number;

    vendor: string;

    model: string;

    percent: string;
}


export interface MemoryStats {

    total: number;

    used: number;

    free: number;

    swap_total: number;

    swap_used: number;

    swap_free: number;

    percent: string;
}


export interface DiskStats {
    mountpoint: string;

    fstype:string;

    total: string;

    used: string;

    free: string;

    percent: string;
}


export interface NetworkStats {
    id: string;

    bytes_sent:number;

    bytes_recv: number;

    packets_sent: number;

    packets_recv: number;

    errin: number;

    errout: number;

    dropin: number;
    
    dropout: number;
}


export interface SystemStats {
    os: OSStats,

    cpu: CPUStats,

    memory: MemoryStats,

    disk: DiskStats,

    network: NetworkStats
}


export interface SimpleNotificationObject {
    message: string,
    type:number
    timestamp:number
}

export interface SimpleDataNotificationObject {
    data: object,
    timestamp:number
}


export interface DataNotificationObject {
    message: string,
    type:number,
    data: object,
    timestamp:number
}


export interface IRPC{
    requestid:string,
    type:string,
    intent:string
    params?:any
    timestamp?:number
}


export interface ISocketServiceObject {
    host:string,
    port:number
    authtoken:string,
    queryparams?:string,
    
}


export interface IClientChannel {
    onUIEvent:ISimpleEvent<any>;
    onTextNotification:ISimpleEvent<any>;
    onTextDataNotification:ISimpleEvent<any>;
    onServerData:ISimpleEvent<any>;
    onClientStateUpdate:ISimpleEvent<ClientState>;
}


export interface IServiceClient extends IClientChannel {
    get_accessible_file_system_paths():Promise<any>
    delete_file(path:string):Promise<any>
    delete_folder(root:string, dirname:string, deleteNonEmpty:boolean):Promise<any>
    download_file(path:string, mode:string):Promise<any>
    list_path_content(root:string, path:string):Promise<any>
    read_file(path:string):Promise<string>
    write_file(path:string, content:string):Promise<void>
    get_logs():Promise<Array<LogInfo>>
    list_rules(head:boolean):Promise<Array<RuleInfo>>
    reload_rules():Promise<any>
    reload_rule(id:string):Promise<any>
    get_rule(id:string):Promise<any>
    generate_sample_rule():Promise<any>
    write_rule(data:string, update:boolean):Promise<any>
    delete_rule(id:string):Promise<string>
    subscribe_datachannel(topic:string):Promise<any> 
    subscribe_stats():Promise<any>   
    subscribe_ui_updates():Promise<any>    
    unsubscribe_stats():Promise<any>
    subscribe_log(topic: string):Promise<any>   
    unsubscribe_log(topic: string):Promise<void>
    download_log(logkey: string, mode:string):Promise<string>
    get_system_services():Promise<string[]>    
    start_service(name: string):Promise<void>
    stop_service(name: string):Promise<void>
    restart_service(name: string):Promise<void>
    execute_arbitrary_action(intent:string, params:any):Promise<void>    
    connectWithAuthData(authData:AuthData):Promise<any>
}


export interface IServiceChannel{
    onChannelData:ISimpleEvent<any>,    
    onChannelState:ISimpleEvent<any>
}


export interface IServiceSocket extends IServiceChannel {
    host:string,
    port:number
    autoconnect?:boolean
    queryparams?:string,

    getHost: ()=>string,
    getPort: ()=>number,
    connectService: ()=>Promise<any>,
    disconnectService: ()=>void,
    is_connected: ()=>boolean,
    doRPC: (methodName:string, params?:object)=>Promise<any>
}



export interface IClientConfig {
    host:string,
    port:number
    username?:string,
    password?:string,
    authdata?:AuthData,
    autoconnect?:boolean,
    reconnectOnFailure?: boolean;
}

