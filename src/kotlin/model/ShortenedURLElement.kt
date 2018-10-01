package model

import kotlin.js.Date

data class ShortenedURLElement(
    val originalUrl: String,
    val shortId: String,
    val hasSecurity: Boolean
) {
    val type: String = if(hasSecurity) "https" else "http"
    val checkIn = Date.now()
}