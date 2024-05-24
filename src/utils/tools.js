import yaml from 'js-yaml'

export const obj2Yaml = (obj) => {
    let yamlData = null
    try {
        yamlData = yaml.dump(obj)
    } catch (error) {
        return `转换失败${error.message}`
    }
    return yamlData
}


export const object2List = (obj) => {
    let list = []
    if (obj === null || obj === undefined) {
        return list
    }
    for (let [key, value] of Object.entries(obj)) {
        const o = {
            key: key,
            value: value
        }
        list.push(o)
    }
    return list
}

export const list2Object = (list) => {
    let obj = {}
    if (list === null || list === undefined) {
        return obj
    }
    for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.key === "") {
            continue
        }
        obj[item.key] = item.value
    }
    return obj
}