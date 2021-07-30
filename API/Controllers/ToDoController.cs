using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private static List<ToDo> _toDos = new List<ToDo>()
        {
            new ToDo
            {
                IsDone = false,
                Description = "learn asp.net core"
            }
        };


        [HttpGet]
        public ActionResult<IEnumerable<ToDo>> Get()
        {
            var visibleToDos = _toDos.Where(t => !t.IsDone);
            return Ok(visibleToDos);
        }

        [HttpPost]
        public ActionResult Post([FromBody] ToDo toDo)
        {
            _toDos.Add(toDo);

            return Ok();
        }
    }
}
