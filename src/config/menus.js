export const menus = [
    {
        "title": "大盘",
        "path": "/index",
        "icon": "Grid",
        "type": 1
    },
    {
        "title": "集群资源",
        "path": "/cluster",
        "icon": "Histogram",
        "type": 2,
        "children": [
            {
                "title": "集群列表",
                "path": "/cluster/list",
                "type": 1
            },
            {
                "title": "节点列表",
                "path": "/cluster/node",
                "type": 1
            },
            {
                "title": "命令空间",
                "path": "/cluster/namespace",
                "type": 1
            }
        ]
    },
    {
        "title": "用户管理",
        "path": "/user",
        "icon": "User",
        "type": 2,
        "children": [
            {
                "title": "用户列表",
                "path": "/user/list",
                "type": 1
            },
        ]
    }
]