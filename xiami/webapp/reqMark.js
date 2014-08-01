/**
 *  @req:
 *      - req.params.name || req.params[0] 后者为正则捕获
 *      - req.query
 *          可以用于?color[blue]=yes 则query.color.blue = "yes"
*       - req.body 解析post请求体，默认{}, 需要中间件bodyParser()
 *      - req.files  内部使用node-formidable
 *          app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/my/files' }));
*       - req.route 返回route对象
 *      - req.cookies 中间件cookieParser()
 *      - req.signedCookies 中间件cookieParser(secret)
 *      - req.get(field) 请求头里的field值 req.get('Content-Type')
 *      - req.accepts(types), req.accepted,req.is(type)
 *      - req.ip 远程ip, req.ips
 *      - req.path
 *      - req.host, req.fresh, req.stale, req.xhr, req.protocol, req.secure
 *      - req.subdomains 数组
 *      - req.originalUrl, req.accepteLanguages,
*   @res
 *      - status(code)
 *          res.status(404).sendfile('path/to/404.png');
 *      - res.set(field, [value]), res.header()
 *      - res.get(field)
 *      - res.cookie(), res.clearCookie,
 *      - res.redirect(path)
 *      - res.charset
 *      - res.location
 *      - res.send([body|status], [body])
 *      - res.json([status|body], [body])
 *      - res.jsonp()
 *      - res.type()
 *      - res.format()
 *      - res.attachment([flename])
 *      - res.sendfile()
 *      - res.download()
 *      - res.links()
 *      - res.locals
 *      - res.render(view, [locals], callback)
 *  @中间件
 *      basicAuth()
 *      bodyParser()
 *      compress()
 *      cookieParser()
 *      cookieSession()
 *      csrf()  //req.csrfToken() 需要session支持
 *      directory() static()
 *  @author liuwencheng
 *  @date 14-4-3
 */
"user strict"
////
