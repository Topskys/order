/**
 * mixins
 * 混入模块
 */

import Axios from "axios";


export const mixin = {
    data(){
        return {
            val:"",
            option: [],
            // props: {
            //     label: "label",
            //     value: "value",
            // }
        }
    },
    computed: {
        url() {
            return this.config?.url
        },
        initRequest() {
            return this.config?.init_request
        },
        method() {
            return this.config?.method || "GET"
        },
        fetchSearch() {
            return this.config?.fetch_search
        },
        keyword() {
            return this.config?.keyword || "keyword"
        },
        multiple() {
            return this.config?.multiple
        }
    },
    watch:{
        config:{
            handler(nv){
                this.initOptions();
                this.initProps();
            },
            immediate:true,
        },
        value:{
            handler(nv){
                this.val=nv
            },
            immediate: true,
        }
    },
    methods: {
        handlerChange(v){
            this.$emit("update:value",v)
            this.config.cb && this.config.cb(v)
        },
        /**
         * 初始化参数
         */
        initOptions() {
            if(this.url){
                this.fetchOptions()
                return false;
            }
            const option = this.config.options;
            if(option && Array.isArray(option) && option.length > 0){
                this.option=option;
            }
        },
        /**
         * 异步请求
         */
        fetchOptions(){
            this.initRequest && this.getOption();
        },
        /**
         * 异步关键字请求
         * @param {*} query 
         */
        keywordRequest(query){
            query && this.fetchSearch && this.getOption(query);
        },
        /**
         * 获取option列表
         * @param {*} value 
         */
        getOption(value){
            const request_data={
                url:this.url,
                method:this.method
            }

            if (this.method?.toLowerCase() ==='get'){
                request_data.params=value?{[this.keyword]:value}:{}
            }

            if (this.method?.toLowerCase() === 'post') {
                request_data.data = value ? { [this.keyword]: value } : {}
            }
            
            Axios(request_data).then(res=>{
                this.option=res.data.data
            })
        },
        /**
         * 初始化props
         */
        initProps(){
            const option=this.config.props;
            // 获取默认值的key
            const keys=Object.keys(this.props)
            if(option && Object.prototype.toString.call(option) === '[object Object]'){
                for(const key in option){

                }
            }
        }
    }
}



export const props = {
    props: {
        config: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: [String,Number,Array,Object],
            default: "",
        },
    }
}



