import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from "axios";
import { Region } from './region.enum';

@Injectable()
export class BtcComService {
    private ENDPOINT = "https://pool.api.btc.com/v1";
    private btc_com_access_key: string;
    private btc_com_puid: number;

    constructor(private readonly configService: ConfigService) {
        this.btc_com_access_key = this.configService.get<string>("btc_com_access_key");
        this.btc_com_puid = this.configService.get<number>("btc_com_puid");

        // this.accountVerifyCode("email").then(x => console.log("accountVerifyCode", x))
        // this.accountInfo().then(x => console.log("accountInfo", x))
        // this.accountEarnStats().then((x: any) => console.log("accountEarnHistory", x, x.data.merge_mining_addresses))
        // this.accountEarnHistory().then((x: any) => console.log("accountEarnStats", x))
        // this.accountSubAccountList().then(x => console.log("accountSubAccountList", x))
        // this.accountSubAccountHashrateMiners([772951, 777155]).then((x: any) => console.log("accountSubAccountHashrateMiners", x))
        // this.accountSubAccountMoreList().then((x: any) => console.log("accountSubAccountMoreList", x.data.display))
        // this.accountAddressUpdate("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "").then(x => console.log("accountSubAccountList", x))
        // this.worker().then(x => console.log("worker", x))
        // this.blocks(100000000000, 1).then((x: any) => console.log("blocks", x)) // Не получается вызвать. Ошибка
        // this.realtimeHashrate().then((x: any) => console.log("realtimeHashrate", x))
        // this.workerGroups().then((x: any) => console.log("workerGroup", x.data.list))
        // this.workerStats().then(x => console.log("workerStats", x))
        // this.workerFullStats().then(x => console.log("workerFullStats", x))
        // this.accountSubAccountCreate("TestAziz", "eu", "1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ").then(x => console.log("accountSubAccountCreate", x))
        // this.poolShareHistory(Math.floor(new Date().getTime() / 1000 - 10000)).then((x: any) => console.log("poolShareHistory", x, x.data.tickers[0]))
        // this.poolStatus().then((x: any) => console.log("poolStatus", x))
        // this.poolUrlConfig("CN").then((x: any) => console.log("poolUrlConfig", x))
        // this.poolNodeList().then((x: any) => console.log("poolNodeList", x))

    }

    async call(
        method: "POST" | "GET",
        url: "/account/info"
            | "/account/earn-stats"
            | "/account/earn-history"
            | "/account/sub-account/list"
            | "/account/sub-account/morelist"
            | "/account/sub-account/create"
            | "/account/address/update"
            | "/account/verify-code/sms"
            | "/account/verify-code/email"
            | "/account/sub-account/hashrate-miners"
            | "/worker"
            | "/worker/groups"
            | "/worker/stats"
            | "/worker/full-stats"
            | "/realtime/hashrate"
            | "/blocks"
            | "/pool/share-history"
            | "/pool/status"
            | "/pool/url-config"
            | "/pool/node-list"
        ,
        query: any = {}
    ) {
        var options = {
            method,
            url: this.ENDPOINT + url,
            headers: { 'Content-Type': 'application/json' },
            data: { access_key: this.btc_com_access_key, puid: this.btc_com_puid, ...query }
        };
        const data = await new Promise((resolve: Function) => {
            axios.request(options).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                Logger.error(error?.response?.status + ": " + error?.response?.data?.message || error?.message || error, options.url);
                resolve(null)
            });
        })
        return data;
    }

    /**
     * Получить пользовательскую информацию
     * @returns 
     */
    async accountInfo() {
        return this.call("GET", "/account/info");
    }
    /**
     * Обзорный доход пользователя
     *  */
    async accountEarnStats() {
        return this.call("GET", "/account/earn-stats");
    }

    /**
     * История начислений пользователя
     * @returns 
     */
    async accountEarnHistory() {
        return this.call("GET", "/account/earn-history");
    }

    /**
     * Список субаккаунтов
     * @returns 
     */
    async accountSubAccountList() {
        return this.call("GET", "/account/sub-account/list");
    }

    /**
     * Расширенная информация по субаккаунтам
     * @returns 
     */
    async accountSubAccountMoreList() {
        return this.call("GET", "/account/sub-account/morelist");
    }

    /**
     * Создать субаккаунт
     * @param worker_name 
     * @param region_node 
     * @param bitcoin_address 
     * @returns 
     */
    async accountSubAccountCreate(worker_name: string, region_node: string, bitcoin_address: string) {
        return this.call("POST", "/account/sub-account/create", { worker_name, region_node, bitcoin_address });
    }

    /**
     * Получить хешрейты майнеров на суббаккантах
     * @param puids 
     * @returns 
     */
    async accountSubAccountHashrateMiners(puids: number[]) {
        return this.call("GET", "/account/sub-account/hashrate-miners", { puids: puids.join(",") });
    }

    /**
     * Получить код верификации аккаунта по смс или email
     * @param mode 
     * @returns 
     */
    async accountVerifyCode(mode: "sms" | "email") {
        return this.call("GET", `/account/verify-code/${mode}`);
    }

    /**
     * Сменить биткоин адрес на аккаунте
     * @param new_address 
     * @param verify_id 
     * @param verify_code 
     * @param verify_mode 
     * @returns 
     */
    async accountAddressUpdate(new_address: string, verify_id: string, verify_code: string, verify_mode?: "sms" | "mail" | "") {
        return this.call("GET", "/account/address/update", { new_address, verify_mode, verify_id, verify_code })
    }

    /**
     * Список доступных нод и регионов
     * @returns 
     */
    async poolNodeList() {
        return this.call("GET", "/pool/node-list");
    }

    /**
     * Статус пула
     * @returns 
     */
    async poolStatus() {
        return this.call("GET", "/pool/status");
    }

    /**
     * Получить URL конфиг пула по id региона
     * @param region_id 
     * @returns 
     */
    async poolUrlConfig(region_id: Region) {
        return this.call("GET", "/pool/url-config", { region_id });
    }

    /**
     * Получить информацию по определенной машине
     * @returns 
     */
    async worker() {
        return this.call("GET", "/worker");
    }

    /**
     * Статистика по всем машинам
     * @returns 
     */
    async workerStats() {
        return this.call("GET", "/worker/stats");
    }

    /**
     * Полная статистика по всем машинам
     * @returns 
     */
    async workerFullStats() {
        return this.call("GET", "/worker/full-stats");
    }

    /**
     * Список групп на которые разделены машины
     * @returns 
     */
    async workerGroups() {
        return this.call("GET", "/worker/groups");
    }

    /**
     * Получение хешрейта в реалтайм
     * @returns 
     */
    async realtimeHashrate() {
        return this.call("GET", "/realtime/hashrate");
    }

    /**
     * Получить информацию по-блочно
     * @param page 
     * @param page_size 
     * @returns 
     */
    async blocks(page: number, page_size: number) {
        return this.call("GET", "/blocks", { page, page_size });
    }

    /**
     * Получить историю респределения
     * @param start_ts Required, specifies the timestamp of the start of the force data
     * @param dimension must specify the time dimension of the force data. The optional value is (1h, 1d)
     * @param count Must specify the number of data points to return at most, or null if the return value has no data at the specified time.
     * @param real_point optional (default is none, it is recommended to pass in), incoming is the last point of the tickers data is real-time data, old rules are not passed in (first 15 minutes real time, remaining time is statistics)
     * @returns 
     */
    async poolShareHistory(start_ts: number, dimension: "1h" | "1d" = "1d", count: number = 100, real_point: boolean = false) {
        return this.call("GET", "/pool/share-history", { dimension, start_ts, count, real_point });
    }

}
