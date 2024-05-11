export const menus = [
    {
        "title": "首页",
        "path": "/index",
        "icon": "Grid",
        "type": 1
    },
    {
        "title": "用户",
        "path": "/user",
        "icon": "User",
        "type": 2,
        "children": [
            {
                "title": "添加用户",
                "path": "/user/add",
                "icon": "User",
                "type": 1
            },
            {
                "title": "删除",
                "path": "/user/delete",
                "icon": "User",
                "type": 1
            },
        ]
    }
]