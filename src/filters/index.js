import config from "@/config/index.config.js"

const toFixedTwo = (value)=>{
    return parseFloat(value).toFixed(2)
}

const imgUrl = (url) => {
	return config.imgUrl + url;
}

const filterGoodsName = (value)=>{
    return value.length > 4 ? value.slice(0,4) : value;
}

const filterCellNum = (value)=>{
    return value.slice(0,3) + '*****' +value.slice(8,11);
}

const filterUnit = (value)=>{
    return value.split('|')[1]
}

const formatMsgDate = (value1,value2)=>{
    var now = new Date(value1*1000);
    var date = new Date(value2*1000);
    //计算时间间隔，单位为分钟
    var inter = parseInt((now.getTime() - date.getTime())/1000/60);
    if(inter == 0){
        return "刚刚";
    }
    //多少分钟前
    else if(inter < 60){
        return inter.toString() + "分钟前";
    }
    //多少小时前
    else if(inter < 60*24){
        return parseInt(inter/60).toString() + "小时前";
    }
    else if(now.getFullYear() == date.getFullYear()){
        return (date.getMonth()+1).toString() + "-" +
            date.getDate().toString() + " " + 
            date.getHours() + ":" +
            date.getMinutes();
    }
    else{
        return date.getFullYear().toString().substring(2, 3) + "-" +
        (date.getMonth()+1).toString() + "-" + 
        date.getDate().toString() + " " + 
        date.getHours() + ":" +
        date.getMinutes();
    }
}

const formatChatDate = (vale)=>{

}
export {toFixedTwo,filterGoodsName,filterCellNum,formatMsgDate,formatChatDate,filterUnit,imgUrl}
