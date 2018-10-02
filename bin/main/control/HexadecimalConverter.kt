package control

class HexadecimalConverter {

    fun convertDecimal(decimalValue: Int): String {
        var d = decimalValue
        val chars = ArrayList<Char>()
        var temp: Int
        val hex = 16

        do {
            temp = d % hex
            chars.add(if (temp < 10) {
                (temp + 48).toChar()        // 1, 2, 3, 4, 5, 6, 7, 8, 9
            } else (temp + 55).toChar())    // A, B, C, D, E, F
            d /= hex
        } while (d > 0)

        val result = chars.joinToString().replace(", ", "")
        return result.reversed().toLowerCase()
    }

}