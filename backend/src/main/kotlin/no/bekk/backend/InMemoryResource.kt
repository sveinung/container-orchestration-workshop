package no.bekk.backend

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import java.util.concurrent.atomic.AtomicInteger

@RestController
class InMemoryResource {

    val todos: MutableMap<Int, Todo> = HashMap()
    val counter: AtomicInteger = AtomicInteger(1)

    @RequestMapping(value = "/v1", method = arrayOf(RequestMethod.GET))
    fun showAll() : List<Todo> {
        return ArrayList(todos.values)
    }

    @RequestMapping(value = "v1", method = arrayOf(RequestMethod.PUT))
    fun new(@RequestBody todo: Todo) : ResponseEntity<Any> {
        if (todo.id != -1) {
            return ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        val id = counter.andIncrement
        val todoWithId = todo.copy(id = id)
        todos.put(id, todoWithId);

        return ResponseEntity(todoWithId, HttpStatus.OK)
    }

    @RequestMapping(value = "v1", method = arrayOf(RequestMethod.POST))
    fun update(@RequestBody todo: Todo) : ResponseEntity<Any> {
        if (!todos.contains(todo.id)) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        todos.put(todo.id, todo)
        return ResponseEntity(todo, HttpStatus.OK)
    }

    @RequestMapping(value = "v1/{id}", method = arrayOf(RequestMethod.POST))
    fun delete(@RequestParam("id") id: Int) : ResponseEntity<Any> {
        if (!todos.contains(id)) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        todos.remove(id)
        return ResponseEntity(HttpStatus.ACCEPTED)
    }

}