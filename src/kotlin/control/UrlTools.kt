package control

import model.ShortenedURLElement
import kotlin.js.Date
import kotlin.js.Json
import kotlin.js.Math
import kotlin.js.json
import kotlin.math.floor

class UrlTools {

    private val shortenedCollection = ArrayList<ShortenedURLElement>()
    private val _min = 1000000
    private val _max = 9999999

    fun shortUrl(url: String): Json {
        val serialize = floor((_min.. _max).random())
        val shortened = "$serialize"
        if (shortenedCollection.size > 0) {
            if (shortenedCollection.find { it.shortId == shortened } != null) {
                shortUrl(url)
            }
        }
        val sce = ShortenedURLElement(
            url,
            shortened,
            hasSecurity = url.substring(0, 5) == "https"
        )

        return if (shortenedCollection.size <= _max) {
            shortenedCollection.add(sce)
            JSON.parse(JSON.stringify(sce))
        } else json(
            "error" to "Infelizmente atingimos o limite de URLs encurtadas!",
            "code" to 3
        )
    }

    fun unshortUrl(shortned: String): Json {
        val notFound = json(
            "error" to "A URL nao foi encontrada ou esta expirada!",
            "code" to 2
        )
        val url: ShortenedURLElement? = shortenedCollection.find {
            it.shortId == shortned
        }
        return if (url == null) {
            notFound
        } else {
            val encodedDate = Date(url.checkIn).getTime()
            val expireLimit = Date().getTime() + (5 * ((60000 * 60) * 24))
            if (encodedDate >= expireLimit) {
                shortenedCollection.remove(url)
                notFound
            } else JSON.parse(JSON.stringify(url))
        }
    }

    fun getAllUrls(): Json {
        val urls = ArrayList<Json>()
        if (shortenedCollection.size == 0) {
            return json("error" to "Nenhuma URL foi encurtada ainda", "code" to 1)
        }
        shortenedCollection.forEach { urls.add(json("shortId" to it.shortId, "url" to it.originalUrl)) }
        return json("urls" to urls.toJSON())
    }

    // funçao customizada para gerar um numero aleatorio
    fun IntRange.random() = Math.random() * start + endInclusive

}