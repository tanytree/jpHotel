import Mock from 'mockjs'





//上传文件
export function upload() {
    return {
        url: '/market/upload/upload',
        type: 'post',
        data: {
            "code": 200,
            "message": "上传成功！",
            "data": {
                "file_url": 'https://www.i2b2b.com/public/1.jpg'
            }
        }
    }
}

// 登录
export function login() {
    return {
        // isOpen: false,
        url: '/jwt/token',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0,
            'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
            'data': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
            'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
        }
    }
}


// 登录
export function platformUser() {
    return {
        // isOpen: false,
        url: '/jwt/platformUser',
        type: 'post',
        data: {
            'msg': 'success',
            'id': '2223',
            'tenants': [
                { 'id': '33', 'dbResourceId': "333" }
            ],
            'username': "33222",
            'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
            'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
        }
    }
}


// 登录
export function leftMean() {
    return {
        // isOpen: false,
        url: '/menu/menus/left',
        type: 'post',
        data: {
            'code': 0,
            'msg': 'success',
            'id': '2223',
            'data': [
                { 'menuId': 1, 'dbResourceId': "333" },
                { 'menuId': 10000, 'dbResourceId': "333" },
                { 'menuId': 11000, 'dbResourceId': "333" },
                { 'menuId': 11001, 'dbResourceId': "333" },
                { 'menuId': 11002, 'dbResourceId': "333" },
                { 'menuId': 11003, 'dbResourceId': "333" },
                { 'menuId': 11004, 'dbResourceId': "333" },
                { 'menuId': 11006, 'dbResourceId': "333" },
                { 'menuId': 11006, 'dbResourceId': "333" },
                { 'menuId': 11007, 'dbResourceId': "333" },
                { 'menuId': 12000, 'dbResourceId': "333" },
                { 'menuId': 1010101, 'dbResourceId': "333" },
                { 'menuId': 1010104, 'dbResourceId': "333" },
                { 'menuId': 1010105, 'dbResourceId': "333" },
                { 'menuId': 102, 'dbResourceId': "333" },
                { 'menuId': 10201, 'dbResourceId': "333" },
                { 'menuId': 1020102, 'dbResourceId': "333" },
                { 'menuId': 1020103, 'dbResourceId': "333" },
                { 'menuId': 2, 'dbResourceId': "333" },
                { 'menuId': 201, 'dbResourceId': "333" },
                { 'menuId': 20101, 'dbResourceId': "333" },
                { 'menuId': 3, 'dbResourceId': "333" },
                { 'menuId': 301, 'dbResourceId': "333" },
                { 'menuId': 30101, 'dbResourceId': "333" },
                { 'menuId': 302, 'dbResourceId': "333" },
                { 'menuId': 30201, 'dbResourceId': "333" },
                { 'menuId': 30202, 'dbResourceId': "333" },
                { 'menuId': 30203, 'dbResourceId': "333" },
                { 'menuId': 30204, 'dbResourceId': "333" },
                { 'menuId': 30205, 'dbResourceId': "333" },
                { 'menuId': 30206, 'dbResourceId': "333" },
                { 'menuId': 30207, 'dbResourceId': "333" },
                { 'menuId': 30208, 'dbResourceId': "333" },
                { 'menuId': 30209, 'dbResourceId': "333" },
                { 'menuId': 30210, 'dbResourceId': "333" },
                { 'menuId': 303, 'dbResourceId': "333" },
                { 'menuId': 304, 'dbResourceId': "333" },
                { 'menuId': 305, 'dbResourceId': "333" },
                { 'menuId': 306, 'dbResourceId': "333" },
                { 'menuId': 307, 'dbResourceId': "333" },
                { 'menuId': 308, 'dbResourceId': "333" },
                { 'menuId': 309, 'dbResourceId': "333" },
                { 'menuId': 8, 'dbResourceId': "333" },
                { 'menuId': 801, 'dbResourceId': "333" },
                { 'menuId': 80101, 'dbResourceId': "333" },
                { 'menuId': 80102, 'dbResourceId': "333" },
                { 'menuId': 80103, 'dbResourceId': "333" },
                { 'menuId': 802, 'dbResourceId': "333" },
                { 'menuId': 80201, 'dbResourceId': "333" },
                { 'menuId': 80202, 'dbResourceId': "333" },
                { 'menuId': 803, 'dbResourceId': "333" },
                { 'menuId': 80301, 'dbResourceId': "333" },
                { 'menuId': 80302, 'dbResourceId': "333" },
                { 'menuId': 80401, 'dbResourceId': "333" },
                { 'menuId': 80402, 'dbResourceId': "333" },
                { 'menuId': 80403, 'dbResourceId': "333" },
                { 'menuId': 80501, 'dbResourceId': "333" },
                { 'menuId': 80502, 'dbResourceId': "333" },
                { 'menuId': 4, 'dbResourceId': "333" },
                { 'menuId': 40101, 'dbResourceId': "333" },
                { 'menuId': 40103, 'dbResourceId': "333" },
                { 'menuId': 40104, 'dbResourceId': "333" },
                { 'menuId': 4010401, 'dbResourceId': "333" },
                { 'menuId': 4010402, 'dbResourceId': "333" },
                { 'menuId': 40102, 'dbResourceId': "333" },
                { 'menuId': 40105, 'dbResourceId': "333" },
                { 'menuId': 40106, 'dbResourceId': "333" },
                { 'menuId': 4010601, 'dbResourceId': "333" },
                { 'menuId': 4010602, 'dbResourceId': "333" },
                { 'menuId': 40110, 'dbResourceId': "333" },
                { 'menuId': 40111, 'dbResourceId': "333" },
                { 'menuId': 4011101, 'dbResourceId': "333" },
                { 'menuId': 4011102, 'dbResourceId': "333" },
                { 'menuId': 80502, 'dbResourceId': "333" },
                { 'menuId': 80502, 'dbResourceId': "333" },







            ],
            'username': "33222",
            'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
            'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
        }
    }
}
// 登录
export function getTradeData() {
    return {
        // isOpen: false,
        url: '/orgList',
        type: 'post',
        data: {
            'code': 1,
            'msg': 'success',

            'data': [
                { 'payAmount': '33', 'payCount': "333", 'payCountByPeople': 33 }
            ],
            'username': "33222",
            'expire': Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
            'token': Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
        }
    }
}




// 退出
export function logout() {
    return {
        // isOpen: false,
        url: '/sys/logout',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}


// 退出
export function logout2() {
    return {
        // isOpen: false,
        url: '/user/getUserByPage',
        type: 'post',
        data: {
            'msg': 'success',
            'code': 0
        }
    }
}



