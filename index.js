/*
 * ©2024 满月叶
 * GitHub: MoonLeeeaf
 * 核心代码部分
 */

// 该项目只用不到半天就完成了 2024.5.5 15：03：31

// 辅助类：异步请求
class Ajax {
    static get(url) {
        return new Promise((res) => $.get(url, (re) => res(re)))
    }
    static getJson(url) {
        return new Promise((res) => $.getJSON(url, (re) => res(re)))
    }
    static getRaw(url) {
        return new Promise((res) => {
            $.ajax({
                url: url,
                method: 'GET',
                xhrFields: {
                    responseType: 'arraybuffer'
                },
                success: function(data) {
                    res(data)
                },
                error: function(error) {}
            })
        })
    }
}

// 辅助类：哈希
class Hash {
    static md5(data) {
        return CryptoJS.MD5(data)
            .toString(CryptoJS.enc.Hex)
    }
    static sha256(data) {
        return CryptoJS.SHA256(data)
            .toString(CryptoJS.enc.Hex)
    }
}

// 大坑：不加分号可能会导致未知的异常且无法排查，害得我整五十年，气死我了，之前一直这样写都没问题的

// 核心类：反编译
class Kitten4Decompiler {
    static async decompile(work_id, onUpdate) {
        if (!onUpdate) onUpdate = () => {}
        return new Promise(async (res, rej) => {
            try {
                onUpdate(0)
                
                // K4 专用链
                let info = await Ajax.getJson("https://api-creation.codemao.cn/kitten/r2/work/player/load/" + work_id)

                // 第一项就是最新出来的文件, 一般情况取最新就足够了(除非需要回档, 当然这个以后会做的)
                let sourceUrl = info.source_urls[0]

                onUpdate(1)

                // 打包项目源代码
                res({data: JSON.stringify(await Ajax.getJson(sourceUrl)), info: info})
            } catch (e) {
                rej(e);
            }
        });
    }
}
