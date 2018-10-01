import control.UrlTools
import model.ShortenedURLElement
import kotlin.js.json

external fun require(module: String): dynamic

fun main(args: Array<String>) {
    val express = require("express")
    val bodyParser = require("body-parser");
    val app = express()
    val urlTools = UrlTools()

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(object {
        val extended = true
    }))

    app.get("/short") { req, res ->
        val url = req.query.url as String?
        if (url == null) {
            res.status(404).send(json(
                "error" to "Nenhuma URL foi informada como parametro!",
                "code" to 5
            ))
        } else {
            val result = urlTools.shortUrl(url)
            res.status(200).send(
                JSON.parse(JSON.stringify(result))
            )
        }
    }

    app.get("/:shortId") { req, res ->
        val shortId = req.params["shortId"] as String?
        if (shortId == null) {
            res.status(404).send(json(
                "error" to "Nenhuma URL foi informada como parametro!",
                "code" to 5
            ))
        } else {
            val result = urlTools.unshortUrl(shortId)
            if (result["error"] != null) {
                res.status(500).send(
                    result
                )
            } else {
                val decoded = JSON.parse<ShortenedURLElement>(JSON.stringify(result))
                res.redirect("${decoded.type}://${decoded.originalUrl}")
            }
        }
    }

    app.get("/") { _, res ->
        val result = urlTools.getAllUrls()
        if (result["error"] != null) {
            res.status(500).send(
                result
            )
        } else {
            res.status(200).send(
                result
            )
        }
    }

    val listen = app.listen(3000) {
        println("[>] LVL URL SHORTENER is running! \n[!] Port: 3000")
    }
}
