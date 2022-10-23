module.exports = (obj,{limit,pageNo}) =>{
    obj.limit = (limit) ? Number(limit) : 5
    if(pageNo) {
        const mainlimit = limit || 5
        const offset = (pageNo - 1) * mainlimit
        obj.offset = Number(offset)
    }
    return obj
}