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
        "title": "Pod管理",
        "path": "/pods",
        "icon": "TrendCharts",
        "type": 2,
        "children": [
            {
                "title": "pod列表",
                "path": "/pods/list",
                "type": 1
            },
        ]
    },
    {
        "title": "deployment管理",
        "path": "/deployment",
        "icon": "SetUp",
        "type": 2,
        "children": [
            {
                "title": "deployment列表",
                "path": "/deployment/list",
                "type": 1
            },
            {
                "title": "deployment创建",
                "path": "/deployment/create",
                "type": 1
            },
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