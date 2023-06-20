using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace MorphCore.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/query")]
    public class QueryController : ControllerBase
    {
        private readonly ILogger<QueryController> _logger;

        public QueryController(ILogger<QueryController> logger)
        {
            _logger = logger;
        }       

        [HttpGet]
        [Route("test")]
        public IActionResult TestProc()
        {
            // https://zetcode.com/csharp/sqlite/

            // https://zetcode.com/csharp/httpclient/
            /*
            using var client = new HttpClient();
            

            var res = await client.GetAsync("http://localhost:3000/querySubjects");
            var content = await res.Content.ReadAsStringAsync();

            _logger.LogInformation(content);
            */

            string currentDirectory = Directory.GetCurrentDirectory();

            string sqlite3Path = Path.Combine(currentDirectory, "northwind.sqlite3");

            using var con = new SQLiteConnection($"URI=file:{sqlite3Path}");
            con.Open();

            using var cmd = new SQLiteCommand("SELECT * FROM Products", con);
            
            var reader =  cmd.ExecuteReader();

            int count = 0;
            while(reader.Read())
            {
                count++;
            }

            return new OkObjectResult(count);
        }
    }
}