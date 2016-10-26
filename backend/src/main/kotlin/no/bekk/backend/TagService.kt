package no.bekk.backend

import com.google.gson.Gson
import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.stereotype.Service
import java.util.concurrent.TimeUnit

@Service
class TagService {

    private val client = OkHttpClient.Builder()
            .connectTimeout(5, TimeUnit.SECONDS)
            .readTimeout(5, TimeUnit.MINUTES)
            .build()

    private val endpoint: String = System.getenv("SERVICE_ENDPOINT") ?: "http://localhost:8081"

    fun getTags(): List<String> {
        try {
            println("Refresh from " + endpoint)
            val response = client
                    .newCall(Request.Builder()
                            .url(endpoint + "/v1")
                            .build())
                    .execute()
            val body = response.body()
            if (response.code() == 200) {
                val tags = Gson().fromJson(body.string(), List::class.java)
                println("Refreshing: " + tags)
                return tags as List<String>
            }
        } catch (re: RuntimeException) {
            println("Something failed \\_(ツ)_/¯")
        }
        return listOf()
    }
}
