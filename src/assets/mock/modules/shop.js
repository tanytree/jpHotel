import Mock from 'mockjs'



let goodList = [{

}]

for (let i = 0; i < Math.floor(Math.random() * 20 + 1); i++) {
    goodList.push(Mock.mock({
        "id": '@increment',
        "categoryid": "1",
        "title": '@ctitle(3, 5)',
        "label": '@csentence',
        "postage": '@increment(100)',
        "min_price": '@increment(100)',
        "max_price": '@increment(100)',
        "status": 1,
        "type_stock": '@increment(100)',
        "content_img": "@image(40x40)",
        "content": '@ctitle(3, 5)',
        "thumb": "@image(40x40)",
        "thumb_url": "@image(40x40)",
        "stock": '@increment(100)',
        "sell": '@increment(10)',
        "create_time": '@datetime',
        "co_name": '@cname',
        "co_logo": '@increment(1000)',
        "option": [{
            "id": 37,
            "price": "100.00",
            "old_price": '@increment(1000)',
            "cost_price": '@increment(1000)',
            "purchase_price": '@increment(1000)',
            "stock": '@increment(1000)',
            "sell": '@increment(1000)'
        }]
    }))
}
//上传文件
export function get_goods_list() {
    return {
        url: '/market/goods/get_goods_list',
        type: 'post',
        data: {
            "code": 200,
            "message": "获取信息成功！",
            "data": {
                "total": goodList.length,
                "list": goodList
            }
        }
    }
}