export default function querySelect(selector) {
    return new Promise(resolve => {
    const query =wx.createSelectorQuery()
    query.select(selector).boundingClientRect() //组件矩形框
    query.exec((res) => {
        resolve(res)
    })
    })
}